import { FormField } from "@/models/FormField";
import { convertToInputDate, formatDate } from "@/utils/helper";
import React from "react";

interface BaseDynamicFormProps {
  fields: FormField[];
  formData: Record<string, any>;
  onFieldChange: (name: string, value: any) => void;
  onDateFieldChange?: (name: string, value: any) => void;
  formErrors: Record<string, string>;
  columns?: number; // Số lượng cột
}

const BaseDynamicForm: React.FC<BaseDynamicFormProps> = ({
  fields,
  formData,
  onFieldChange,
  onDateFieldChange,
  formErrors,
  columns = 1, // Mặc định là 1 cột
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && "checked" in e.target) {
      onFieldChange(name, e.target.checked);
    } else {
      onFieldChange(name, value);
    }
  };

  const handleDateRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    dateType: "start" | "end"
  ) => {
    const { value } = e.target;

    // Initialize formData[fieldName] if it's not already defined
    const currentRange = formData[fieldName] || { start: "", end: "" };

    // Update the correct date field (start or end)
    currentRange[dateType] = value;

    // Call the parent component's callback function to update the formData
    onDateFieldChange?.(fieldName, currentRange);
  };

  debugger;
  return (
    <form>
      <div
        className="form-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`, // Tạo cột động
          gap: "1rem", // Khoảng cách giữa các cột
        }}
      >
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="form-label fw-semibold">
              {field.label}{" "}
              {field.required ? <span className="text-danger">*</span> : ""}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className={`form-control ${
                  formErrors[field.name] ? "is-invalid" : ""
                }`}
                placeholder={field.placeholder}
                required={field.required}
              />
            ) : field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className={`form-control ${
                  formErrors[field.name] ? "is-invalid" : ""
                }`}
                required={field.required}
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            ) : field.type === "checkbox" ? (
              <>
                <input
                  type="checkbox"
                  id={field.name}
                  name={field.name}
                  checked={formData[field.name] || false}
                  onChange={handleChange}
                  className={`form-check-input ${
                    formErrors[field.name] ? "is-invalid" : ""
                  }`}
                  required={field.required}
                />
                ) : field.type === "date" ? (
                <input
                  type="date"
                  name={field.name}
                  value={
                    formData[field.name]
                      ? convertToInputDate(formData[field.name])
                      : ""
                  }
                  onChange={(e) => handleChange(e)}
                  required={field.required}
                  placeholder={field.placeholder}
                  className={`form-control ${
                    formErrors[field.name] ? "is-invalid" : ""
                  }`}
                />
                {formErrors[field.name] && (
                  <div className="invalid-feedback">
                    {formErrors[field.name]}
                  </div>
                )}
              </>
            ) : field.type === "datetime" ? (
              <input
                type="datetime-local"
                name={field.name}
                value={formData[field.name]}
                onChange={(e) => handleChange(e)}
                required={field.required}
                placeholder={field.placeholder}
                className={`form-control ${
                  formErrors[field.name] ? "is-invalid" : ""
                }`}
              />
            ) : field.type === "daterange" ? (
              <div className="d-flex justify-content-between">
                <div className="col-md-5">
                  <input
                    type="date"
                    name={`${field.name}_start`}
                    value={formData[field.name]?.start || ""}
                    onChange={(e) =>
                      handleDateRangeChange(e, field.name, "start")
                    }
                    required={field.required}
                    placeholder="Start Date"
                    className={`form-control ${
                      formErrors[field.name] ? "is-invalid" : ""
                    }`}
                  />
                  {formErrors[field.name] && (
                    <div className="invalid-feedback">
                      {formErrors[field.name]}
                    </div>
                  )}
                </div>
                <div className="col-md-2 text-center lh-lg">
                  <span>Đến</span>
                </div>
                <div className="col-md-5">
                  <input
                    type="date"
                    name={`${field.name}_end`}
                    value={formData[field.name]?.end || ""}
                    onChange={(e) =>
                      handleDateRangeChange(e, field.name, "end")
                    }
                    required={field.required}
                    placeholder="End Date"
                    className={`form-control ${
                      formErrors[field.name] ? "is-invalid" : ""
                    }`}
                  />
                  {formErrors[field.name] && (
                    <div className="invalid-feedback">
                      {formErrors[field.name]}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className={`form-control ${
                  formErrors[field.name] ? "is-invalid" : ""
                }`}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
            {formErrors[field.name] && (
              <div className="invalid-feedback">{formErrors[field.name]}</div>
            )}
          </div>
        ))}
      </div>
    </form>
  );
};

export default BaseDynamicForm;
