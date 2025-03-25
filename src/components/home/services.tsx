"use client";
import { useCallback, useEffect, useState } from "react";
import DataTable from "../common/DataTable";
import { apiService } from "@/services/apiService";
import Modal from "../common/customModal";
import BaseDynamicForm from "../common/BaseDynamicForm";
import { FormField } from "@/models/FormField";
import BaseAlert from "@/utils/BaseAlert";
import { useRouter } from "next/navigation";

const fields: FormField[] = [
  {
    name: "customer_username",
    label: "Customer Username",
    type: "text",
    value: "",
    required: true,
    minLength: 3,
    maxLength: 50,
    placeholder: "Enter customer username",
    validationMessage: "Customer username is required.",
  },
  {
    name: "request_user_name",
    label: "Request User Name",
    type: "text",
    value: "",
    required: true,
    minLength: 3,
    maxLength: 50,
    placeholder: "Enter request user name",
    validationMessage: "Request user name is required.",
  },
  {
    name: "request_type_id",
    label: "Request Type ID",
    type: "select",
    value: "",
    required: true,
    options: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
    ],
    placeholder: "Enter request type ID",
    validationMessage: "Please enter a valid request type ID.",
  },
  {
    name: "department_name",
    label: "Department Name",
    type: "text",
    value: "",
    required: true,
    minLength: 3,
    maxLength: 50,
    placeholder: "Enter department name",
    validationMessage: "Department name is required.",
  },
  {
    name: "customer_name",
    label: "Customer Name",
    type: "text",
    value: "",
    required: true,
    minLength: 3,
    maxLength: 50,
    placeholder: "Enter customer name",
    validationMessage: "Customer name is required.",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    value: "1",
    required: true,
    options: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
    ],
    placeholder: "Enter status",
    validationMessage: "Please enter a valid status.",
  },
  {
    name: "request_cert_id",
    label: "Request Certificate ID",
    type: "select",
    value: "",
    required: true,
    options: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
    ],
    placeholder: "Enter request certificate ID",
    validationMessage: "Request certificate ID is required.",
  },
  {
    name: "req_user_name",
    label: "Request User Name",
    type: "text",
    value: "",
    required: true,
    minLength: 3,
    maxLength: 50,
    placeholder: "Enter request user name",
    validationMessage: "Request user name is required.",
  },
  {
    name: "request_date",
    label: "Request Date",
    type: "date", // or "datetime-local" for datetime fields
    value: "2024-11-25 13:57:51",
    required: true,
    placeholder: "Enter request date",
    validationMessage: "Please enter a valid request date.",
  },
  {
    name: "request_datetime",
    label: "Request Date and Time",
    type: "datetime",
    value: "",
    required: true,
    placeholder: "Select date and time",
    validationMessage: "Date and time are required.",
  },
  {
    name: "request_date_range",
    label: "Request Date Range",
    type: "daterange",
    value: { start: "", end: "" },
    required: true,
    validationMessage: "Date range is required.",
  },
];

const fields2: FormField[] = [
  {
    name: "firstName",
    label: "Họ tên",
    type: "text",
    value: "",
    required: true,
    minLength: 3,
    maxLength: 50,
    placeholder: "Enter your first name",
    validationMessage:
      "First name is required and must be between 3 to 50 characters.",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    value: "",
    required: true,
    pattern: "^\\S+@\\S+\\.\\S+$", // Simple email regex
    validationMessage: "Please enter a valid email address.",
  },
  {
    name: "password",
    label: "Mật khẩu",
    type: "password",
    value: "",
    required: true,
    minLength: 8,
    validationMessage: "Password must be at least 8 characters long.",
  },
  {
    name: "rememberMe",
    label: "Ghi nhớ",
    type: "checkbox",
    value: false,
    required: false,
    isChecked: false,
  },
  {
    name: "gender",
    label: "Giới tính",
    type: "select",
    value: "",
    required: true,
    customeOptions: ["Male", "Female", "Other"],
    validationMessage: "Please select a gender.",
  },
];

export default function Services() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [loading, setLoading] = useState(false); // Quản lý trạng thái loading
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<Record<string, any> | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  // Form data state
  const [formData, setFormData] = useState<Record<string, any>>(
    fields.reduce((acc: Record<string, any>, field) => {
      acc[field.name] = field.value || ""; // Sử dụng giá trị mặc định nếu không có
      return acc;
    }, {})
  );

  const handleOpenModal = (data: any) => {
    setModalData(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = (data: any) => {
    BaseAlert.confirm("Bạn có chắc chắn muốn xóa không?", () => {
      console.log("Đã xác nhận xóa!");
      handleCloseModal();
    });
  };

  const handleView = (data: any) => {
    console.log("View clicked");
    router.push(`/edit/${data["request_cert_id"]}`);
  };

  const handleAdd = () => {
    setModalData([]);
    setFormData([]);
    setShowModal(true);
  };

  const handleEdit = (data: any) => {
    // Update the modalData with the row's data
    setModalData(data);
    debugger;
    // Populate formData with the selected row's data for editing
    setFormData((prev) => {
      const updatedFormData = { ...prev };
      fields.forEach((field) => {
        if (data[field.name] !== undefined) {
          updatedFormData[field.name] = data[field.name]; // Set the field value from the row data
        }
      });
      return updatedFormData;
    });
    setShowModal(true);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const isValid = validateForm();
    if (isValid) {
      if (Object.keys(formErrors).length === 0) {
        console.log("Form submitted successfully!", formData);
      }
      BaseAlert.confirm("Bạn có chắc chắn muốn xóa không?", () => {
        setData((prevData) => [...prevData, formData]); // Append new row
        BaseAlert.success("Dữ liệu đã được lưu thành công.");
        handleCloseModal();
      });
    } else {
      console.log("Form data is invalid");
    }
  };

  // Handle change in form fields
  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Find the field object for the given field name
    const field = fields.find((f) => f.name === name);
    if (field) {
      field.value = value;
      validateField(name, value, field);
    }
  };

  const handleDateChange2 = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldType: "start" | "end"
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      request_date_range: {
        ...prevData.request_date_range,
        [fieldType]: fieldType,
      },
    }));
  };

  const handleDateFieldChange = (
    fieldName: string,
    updatedRange: { start: string; end: string }
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: updatedRange, // Update formData with the new range
    }));
  };

  const validateField = (name: string, value: string, field: any) => {
    const errors: Record<string, string> = { ...formErrors };
    debugger;
    // Check if the field is required
    if (field.required && !value.trim()) {
      errors[name] = `${field.label} không được để trống.`;
    }
    // Validate date fields
    else if (field.type === "date" && isNaN(Date.parse(value))) {
      errors[name] = `${field.label} không hợp lệ.`;
    }
    // Validate datetime fields
    else if (field.type === "datetime" && isNaN(Date.parse(value))) {
      errors[name] = `${field.label} không hợp lệ.`;
    }
    // Validate daterange fields (start and end dates)
    // Validate daterange fields (start and end dates)
    else if (field.type === "daterange") {
      debugger;
      // Assuming value is an object with 'start' and 'end' properties
      // const { start, end } = value || {};
      // if (!start || !end) {
      //   errors[name] = `${field.label} không hợp lệ.`;
      // } else if (isNaN(Date.parse(start)) || isNaN(Date.parse(end))) {
      //   errors[name] = `${field.label} không hợp lệ.`;
      // } else if (new Date(start) > new Date(end)) {
      //   errors[name] = `Ngày bắt đầu phải trước ngày kết thúc.`;
      // }
    }
    // Add additional field-specific validation for number type
    else if (
      field.type === "number" &&
      (Number(value) <= 0 || isNaN(Number(value)))
    ) {
      errors[name] = `${field.label} phải là số dương.`;
    }
    // Add email validation
    else if (field.type === "email" && !/\S+@\S+\.\S+/.test(value)) {
      errors[name] = `${field.label} không hợp lệ.`;
    } else {
      // Remove any error for valid fields
      delete errors[name];
    }

    setFormErrors(errors); // Update errors state
  };

  const validateForm = () => {
    let errors: Record<string, string> = {};
    let isValid = true;
    debugger;
    // Validate each field based on its rules
    fields.forEach((field) => {
      const value = formData[field.name]?.toString().trim() || ""; // Ensure value is string to handle empty input cases

      // Check if required field is empty
      if (field.required && !value) {
        isValid = false;
        errors[field.name] = `${field.label} không được để trống.`;
      }

      // Additional field-specific validations
      if (field.type === "number") {
        const numericValue = Number(value);
        if (isNaN(numericValue) || numericValue <= 0) {
          isValid = false;
          errors[field.name] = `${field.label} không phải là số.`;
        }
      }

      if (field.type === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
        isValid = false;
        errors[field.name] = `${field.label} không hợp lệ.`;
      }

      // Date validation
      if (field.type === "date" && value && isNaN(Date.parse(value))) {
        isValid = false;
        errors[field.name] = `${field.label} không hợp lệ.`;
      }

      // Datetime validation
      if (field.type === "datetime" && value && isNaN(Date.parse(value))) {
        isValid = false;
        errors[field.name] = `${field.label} không hợp lệ.`;
      }

      // Date range validation
      if (field.type === "daterange") {
        const { start, end } = formData[field.name] || {};
        if (start && end) {
          if (isNaN(Date.parse(start)) || isNaN(Date.parse(end))) {
            isValid = false;
            errors[field.name] = `${field.label} không hợp lệ.`;
          } else if (new Date(start) > new Date(end)) {
            isValid = false;
            errors[field.name] = `Ngày bắt đầu phải trước ngày kết thúc.`;
          }
        }
      }

      // More validations can be added here, like regex checks or custom validators
    });

    setFormErrors(errors); // Update errors state with collected errors
    return isValid;
  };

  const Modalactions = [
    {
      label: "Thêm mới",
      onClick: (e: any) => handleSubmit(e),
      className: "btn-warning",
    },
    {
      label: "Đóng",
      onClick: (e: any) => handleCloseModal(),
      className: "btn-info",
    },
  ];

  const TableActions = [
    { label: "Edit", onClick: handleEdit, className: "btn-warning" },
    { label: "Delete", onClick: handleDelete, className: "btn-danger" },
    { label: "View", onClick: handleView, className: "btn-info" },
  ];

  const fetchData = useCallback(async (page: number, pageSize: number) => {
    setLoading(true); // Bắt đầu loading
    try {
      // const endpoint = `/api/cms/request-cert/list?status=1&request_type=-1&customer_name=&username=&from_date=&to_date=&page_size=${pageSize}&page_index=${
      //   page - 1
      // }&query_type=all`;

      const body = {
        page: 1,
        pageSize: 10,
      };
      const endpoint = "/certcms/cert/list";
      const result = await apiService(endpoint, "POST", body);
      if (result.status === "SUCCESS") {
        let responseData = result.meta_data.select_multi;
        setData(responseData);
        setTotalRecords(result.meta_data.pagination.total_records); // Set total records for pagination
        console.log("Data fetched successfully:", responseData);
      } else {
        console.warn("API responded with an error:", result.description);
      }
    } catch (error) {
      console.error("Network or parsing error occurred:", error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  }, []);

  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize, fetchData]); // Gọi API chỉ khi page hoặc pageSize thay đổi

  const columnDefs = [
    { headerName: "Customer Name", field: "customer_name" },
    { headerName: "Customer Username", field: "customer_username" },
    { headerName: "Department Name", field: "department_name" },
    { headerName: "Request User Name", field: "req_user_name" },
    { headerName: "Request Cert ID", field: "request_cert_id" },
    { headerName: "Request Date", field: "request_date" },
    { headerName: "Request Type ID", field: "request_type_id" },
    { headerName: "Request User Name", field: "request_user_name" },
    { headerName: "Status", field: "status" },
    { headerName: "Actions", field: "actions" },
  ];

  return (
    <>
      <div className="container mt-5">
        {/* Loading Spinner */}
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div> {/* Hiệu ứng loading */}
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="h4">Danh sách</h1>
              <button
                className="btn btn-primary btn-sm"
                key="btnAdd"
                onClick={() => handleAdd()}
              >
                Thêm mới
              </button>
            </div>
            <div>
              <DataTable
                columnDefs={columnDefs}
                initialData={data}
                totalRecords={totalRecords}
                onLoadData={fetchData}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                handleOpenModal={handleOpenModal} // Pass the function to DataTable
                handleCloseModal={handleCloseModal} // Pass the function to DataTable
                TableActions={TableActions}
              />
            </div>
          </>
        )}
      </div>
      <Modal
        showModal={showModal}
        modalData={modalData}
        handleCloseModal={handleCloseModal}
        size="fullscreen" // Or "large", "small", or "custom"
        actions={Modalactions}
        bodyContent={
          <BaseDynamicForm
            fields={fields} // List of fields to render in the form
            onFieldChange={handleFieldChange} // Function to handle field value changes
            onDateFieldChange={handleDateFieldChange} // Function to handle date field changes
            formErrors={formErrors} // Object containing form validation errors
            formData={formData} // Data to be populated in the form
            columns={2} // Display 2 columns (change this number to match your design)
          />
        }
      />

{/* Quill Editor Full */}
              <p>Quill editor with full toolset</p>
              <div className="quill-editor-full">
                <p>Hello World!</p>
                <p>This is Quill <strong>full</strong> editor</p>
              </div>
              {/* End Quill Editor Full */}
      <section id="services" className="services section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Services</h2>
          <p>
            Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex
            aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos
            quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia
            fugiat sit in iste officiis commodi quidem hic quas.
          </p>
        </div>

        <div className="container">
          <div className="row gy-4">{/* Service items here */}</div>
        </div>
      </section>
    </>
  );
}
