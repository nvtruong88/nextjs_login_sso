type Action = {
    label: string; // Label cho nút
    onClick: (row?: Record<string, any>) => void; // Hàm thực thi khi nhấn nút
    className: string; // Lớp CSS cho nút
  };