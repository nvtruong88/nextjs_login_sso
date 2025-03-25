import { FormField } from "@/models/FormField";

type BaseDynamicFormProps = {
    fields: FormField[];
    formData: Record<string, any>;
    onFieldChange: (name: string, value: any) => void;
    formErrors: Record<string, string>;
    columns?: number; // Số lượng cột
  }
  