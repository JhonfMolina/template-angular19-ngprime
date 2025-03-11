import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SplitButton } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, SplitButton, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  loading = false;
}
