import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormConfigService } from '../../../core/services/util/form-config.service';
import { CommonModule } from '@angular/common';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ValidatorsFormComponent } from '../validators-form/validators-form.component';
import { DynamicForm } from '../../../core/interfaces/util/dynamic-form.interface';
import ButtonComponent from '../button/button.component';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputIcon,
    IconField,
    InputTextModule,
    TextareaModule,
    SelectModule,
    FloatLabel,
    FormsModule,
    FloatLabelModule,
    ValidatorsFormComponent,
    ButtonComponent,
  ],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent {
  @Output() onClick = new EventEmitter<any>();
  @Input() formConfig: DynamicForm[] = [];
  @Input() formBtnConfig: any[] = [];
  form: FormGroup | any;

  constructor(private formConfigService: FormConfigService) {}

  ngOnInit(): void {
    this.form = this.formConfigService.createFormGroup(this.formConfig);
  }

  onSubmit(action: string): void {
    if (this.form.valid) {
      this.onClick.emit({ form: this.form.value, event: action });
    }
  }
}
