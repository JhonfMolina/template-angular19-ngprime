import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormConfigService } from '../../../core/services/util/form-config.service';
import { CommonModule } from '@angular/common';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputIcon,
    IconField,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent {
  @Input() config: any[] = [];
  form: FormGroup | any;

  constructor(private formConfigService: FormConfigService) {}

  ngOnInit(): void {
    this.form = this.formConfigService.createFormGroup(this.config);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
    }
  }
}
