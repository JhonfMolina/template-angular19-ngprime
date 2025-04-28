import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { Checkbox } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { ActionButton } from '../../../core/interfaces/util/actions.interfaces';
import { DynamicForm } from '../../../core/interfaces/util/dynamic-form.interface';
import { FormConfigService } from '../../../core/services/util/form-config.service';
import { NotificationService } from '../../../core/services/util/notificacion.service';
import ButtonComponent from '../button/button.component';
import { ValidatorsFormComponent } from '../validators-form/validators-form.component';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    InputIcon,
    IconField,
    InputTextModule,
    TextareaModule,
    SelectModule,
    MultiSelectModule,
    FloatLabel,
    FloatLabelModule,
    ValidatorsFormComponent,
    ButtonComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    Checkbox,
  ],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent {
  @Output() onClick = new EventEmitter<any>();
  @Input() formConfig: DynamicForm[] = [];
  @Input() formBtnConfig: ActionButton[] = [];
  form: FormGroup | any;

  date2: Date | undefined;

  constructor(
    private formConfigService: FormConfigService,
    private _notificationService: NotificationService
  ) {}

  onChange(event: any, field: DynamicForm) {
    if (field.onChange) {
      if (event.value != null) {
        field.onChange(event);
      }
    }
  }

  ngOnInit(): void {
    this.form = this.formConfigService.createFormGroup(this.formConfig);
    console.log(this.formBtnConfig[0].permission);
  }

  private passwordMatchValidator(): boolean | undefined {
    if (
      this.form.get('password_confirmation')?.value &&
      this.form.get('password')?.value
    ) {
      const password = this.form.get('password')?.value;
      const confirmPassword = this.form.get('password_confirmation')?.value;

      if (password !== confirmPassword) {
        this._notificationService.showError(
          'Las contraseñas no coinciden',
          'Por favor verifique las contraseñas ingresadas'
        );
        return true;
      }
      return false;
    }
    return undefined;
  }

  onSubmit(): void {
    console.log(this.form.value);

    if (this.form.valid) {
      if (!this.passwordMatchValidator()) {
        this.onClick.emit(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      this._notificationService.showDanger(
        'Formulario incompleto',
        'Por favor complete los campos requeridos'
      );
    }
  }

  resetForm(): void {
    this.form.reset();
  }

  setFormData(data: any): void {
    this.form.patchValue(data);
  }
}
