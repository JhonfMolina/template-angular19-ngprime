import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validators-form',
  imports: [CommonModule],
  templateUrl: './validators-form.component.html',
  styleUrl: './validators-form.component.scss',
})
export class ValidatorsFormComponent {
  @Input() form: any;
  @Input() field: any;
}
