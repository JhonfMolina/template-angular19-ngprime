import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormConfigService {
  createFormGroup(config: any[]): FormGroup {
    const group: any = {};

    config.forEach((field) => {
      group[field.name] = new FormControl(
        field.value || '',
        this.getValidators(field.validators)
      );
    });

    return new FormGroup(group);
  }

  private getValidators(validators: any): any[] {
    const formValidators = [];

    if (validators) {
      if (validators.required) {
        formValidators.push(Validators.required);
      }
      if (validators.minLength) {
        formValidators.push(Validators.minLength(validators.minLength));
      }
      if (validators.maxLength) {
        formValidators.push(Validators.maxLength(validators.maxLength));
      }
      if (validators.email) {
        formValidators.push(Validators.email);
      }
      if (validators.pattern) {
        formValidators.push(Validators.pattern(validators.pattern));
      }
    }

    return formValidators;
  }
}
