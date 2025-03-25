type DataTableProps = {
    columnDefs: ColumnDef[];
    initialData: Record<string, any>[]; // Data là một mảng các đối tượng động
    onLoadData: (page: number, pageSize: number) => void; // Nhận fetchData từ prop
    totalRecords: number; // Total number of records for pagination
    page: number; // Current page number
    setPage: (page: number) => void; // Setter for page
    pageSize: number; // Number of records per page
    setPageSize: (pageSize: number) => void; // Setter for page size
    handleOpenModal: (row: Record<string, any>) => void; // Open modal function
    handleCloseModal: () => void; // Close modal function
    TableActions: Action[]; // Thêm prop actions
  };