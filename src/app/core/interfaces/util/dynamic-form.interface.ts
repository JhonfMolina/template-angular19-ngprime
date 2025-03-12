export interface DynamicForm {
  type: string;
  icon?: string;
  name: string;
  label: string;
  on_label: string;
  placeholder: string;
  validators: Validators;
  column: string;
  filter?: boolean;
  filterBy?: string;
  showClear?: boolean;
  options?: any[];
  selectedItems?: any[];
}

export interface Validators {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
}
