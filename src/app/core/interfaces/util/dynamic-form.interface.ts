export interface DynamicForm {
  type: string;
  icon?: string;
  visible?: boolean;
  name: string;
  label?: string;
  on_label: string;
  placeholder?: string;
  validators?: Validators;
  column?: string;
  filter?: boolean;
  filterBy?: string;
  showClear?: boolean;
  options?: any[];
  disabled?: boolean;
  selectedItems?: any[];
  onChange?: (event: any) => void;
}

export interface Validators {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  pattern?: string;
}
