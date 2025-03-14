import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form.component';
import { DynamicForm } from '../../core/interfaces/util/dynamic-form.interface';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, ToastModule, DynamicFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  loading = false;

  formBtnConfig = [
    {
      label: 'Sign In',
      icon: 'door-open bx-sm',
      visible: true,
      width: 'w-full',
      appearance: 'base',
      color: 'primary',
      action: 'sign-in',
      disabled: false,
      loading: false,
    },
  ];
  formConfig: DynamicForm[] = [
    {
      type: 'email',
      icon: 'envelope',
      name: 'email',
      label: 'Email',
      on_label: 'Email',
      placeholder: '',
      validators: {
        required: true,
        email: true,
      },
      column: 'col-12 md:col-4 lg:col-12',
    },
    {
      type: 'password',
      icon: 'key',
      name: 'password',
      label: 'Password',
      on_label: 'password',
      placeholder: '',
      validators: {
        required: true,
        minLength: 6,
      },
      column: 'col-12 md:col-2 lg:col-12',
    },
  ];

  action(e: any) {
    switch (e.event) {
      case 'sign-in':
        this.onSignIn(e.form);
        break;
      case 'cancel':
        this.cancel(e.form);
        break;
      default:
        break;
    }
  }

  onSignIn(e: any) {
    this.formBtnConfig[0].loading = true;
    setTimeout(() => {
      this.formBtnConfig[0].loading = false;
      console.log('sign-in', e);
    }, 5000);
  }

  cancel(e: any) {
    console.log('cancel', e);
  }
}
