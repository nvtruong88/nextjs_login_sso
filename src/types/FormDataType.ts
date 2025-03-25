import { FormField } from "@/models/FormField";

type FormDataType = {
  [key in FormField['name']]: string | boolean | number;
};
