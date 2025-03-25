// models/FormField.ts

export interface FormField {
    name: string;                    // Field name (should match the form control's name)
    label: string;                   // Label for the form field
    type: 'text' | 'email' | 'password' | 'textarea' | 'number' | 'select' | 'checkbox' | 'date' | 'datetime' | 'daterange';  // Supported input types
    value: string | number | boolean | string[] | { start: string; end: string }; // Value can be a string, number, boolean, or array for multi-select
    required: boolean;               // Whether the field is required
    placeholder?: string;            // Optional placeholder text
    minLength?: number;              // Optional minLength validation (for text fields)
    maxLength?: number;              // Optional maxLength validation (for text fields)
    isChecked?: boolean;             // For checkbox fields, whether it's checked or not
    validationMessage?: string;      // Custom validation message
    pattern?: string;                // Optional regex pattern for input validation
    options?: { id: number; name: string }[]; // Updated to support an array of objects
    customeOptions?: string[];              // For select type, define available options
  }
  