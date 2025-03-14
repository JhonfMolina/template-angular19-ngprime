import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validators-form',
  imports: [CommonModule],
  templateUrl: './validators-form.component.html',
})
export class ValidatorsFormComponent {
  @Input() form: any;
  @Input() field: any;
}
