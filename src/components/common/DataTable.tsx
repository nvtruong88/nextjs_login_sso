import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-bs5"; // DataTables with Bootstrap 5 styling
import Pagination from "react-js-pagination";
import Empty from "./empty";

const DataTable: React.FC<DataTableProps> = ({
  columnDefs,
  initialData,
  onLoadData,
  totalRecords,
  page,
  setPage,
  pageSize,
  setPageSize,
  TableActions // Thêm prop actions
}) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const pinnedColumns = ["customer_name", "customer_username"]; // Các cột cần pin (dùng `field` từ columnDefs)
  
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
     onLoadData(pageNumber, pageSize); // Chờ API hoàn thành
  };

  useEffect(() => {
    if (tableRef.current) {
      const dataTableInstance = $(tableRef.current).DataTable({
        paging: false,
        searching: false,
        info: false,
        lengthChange: false,
        autoWidth: true,
        order: [], // Disable sorting
        destroy: true, // Cho phép tái khởi tạo DataTable
      });

      return () => {
        dataTableInstance.destroy(false); // Hủy bảng khi component bị tháo gỡ
      };
    }
  }, [initialData, totalRecords]); // Khởi tạo lại khi `initialData` thay đổi

  if (initialData.length === 0) {
    return (
      <Empty />
    );
  }

  return (
    <div className="data-table-container">
     
        <table
          ref={tableRef}
          className="table dataTable table-bordered table-striped table-hover"
        >
          <thead>
            <tr>
              {columnDefs.map((col) => (
                <th
                  key={col.field}
                  className={pinnedColumns.includes(col.field) ? "pinned" : ""}
                >
                  {col.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {initialData.map((row, index) => (
              <tr key={index}>
                {columnDefs.slice(0, -1).map(
                  (col) => (
                    <td
                      key={col.field}
                      data-tooltip={row[col.field]}
                      className={pinnedColumns.includes(col.field) ? "pinned" : ""}
                    >
                      {row[col.field] !== undefined ? row[col.field] : ""}
                    </td>
                  )
                )}
                <td className="px-4 py-2 border">
                  {/* Action buttons */}
                  {TableActions.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    className={`btn btn-sm mx-1 ${action.className}`}
                    onClick={() => action.onClick(row)} // Gọi hàm onClick với row
                  >
                    {action.label}
                  </button>
                ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      {/* Pagination Component */}
      <div className="wrap-footer">
        <div className="row">
          <div className="col-sm-5">
            <div
              className="dataTables_info"
              id="example_info"
              role="status"
              aria-live="polite"
            >
              Hiển thị {((page - 1) * pageSize) + 1} đến {Math.min(page * pageSize, totalRecords)} của {totalRecords} bản ghi
            </div>
          </div>
          <div className="col-sm-7">
            <div className="pagination-wrapper">
              <Pagination
                activePage={page}
                itemsCountPerPage={pageSize}
                totalItemsCount={totalRecords}
                pageRangeDisplayed={5} // Số trang hiển thị
                onChange={handlePageChange}
                innerClass="pagination" // Lớp CSS cho pagination
                activeClass="active" // Lớp CSS cho trang đang chọn
                linkClass="page-link" // Lớp CSS cho liên kết trang
                itemClass="page-item" // Lớp CSS cho từng item trang
                disabledClass="disabled" // Lớp CSS khi phân trang bị vô hiệu hóa
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
