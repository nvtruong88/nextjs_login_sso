"use client";

import { useState, useCallback, Suspense, lazy } from "react";
import { useDropzone } from "react-dropzone";
import "@/styles/FileUpload.css";
import Modal from "./customModal";

// Lazy load PDFViewer
const LazyPDFViewer = lazy(() => import("@/components/common/PDFViewer"));

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [base64Data, setBase64Data] = useState<string | null>(null);
  
  // Xử lý khi kéo và thả file vào
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  // Xóa file khỏi danh sách
  const removeFile = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  // Chuyển file sang base64 và mở modal
  const openModal = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64String = reader.result.split(",")[1];
        setBase64Data(base64String);
        setModalIsOpen(true);
      }
    };
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedFile(null);
    setPageNumber(1);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    debugger;
    alert("Thêm mới thành công!");
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
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

  // Sử dụng hook useDropzone để xử lý kéo thả
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".docx"],
      "application/vnd.ms-excel": [".xlsx"],
      "application/xml": [".xml"],
      "application/vnd.ms-powerpoint": [".pptx"],
    },
    maxSize: 20 * 1024 * 1024, // Giới hạn 20MB
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center">Chọn tài liệu ký</h2>
      <div className="upload-card">
        {/* Khu vực kéo thả file */}
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Kéo tệp vào đây hoặc click để chọn</p>
          <small>Hỗ trợ: PDF, DOCX, XLSX, XML, PPTX (Tối đa 20MB)</small>
        </div>

        {/* Danh sách file đã chọn */}
        <ul className="file-list">
          {files.map((file, index) => (
            <li key={index} className="file-item">
              <span>
                <strong>
                  {index + 1}. {file.name}
                </strong>{" "}
                ({(file.size / 1024).toFixed(2)} KB)
              </span>
              <div>
                <button className="btn-edit" onClick={() => openModal(file)}>
                  Sửa
                </button>
                <button
                  className="btn-delete"
                  onClick={() => removeFile(file.name)}
                >
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Nút ký số */}
        {files.length > 0 && <button className="btn-sign">Ký số</button>}
      </div>

      {/* Modal xem file PDF */}
      <Modal
        showModal={modalIsOpen}
        modalData={null}
        handleCloseModal={closeModal}
        size="fullscreen" // Or "large", "small", or "custom"
        actions={Modalactions}
        bodyContent={
          <Suspense fallback={<div className="loader">Đang tải dữ liệu...</div>}>
          {base64Data && <LazyPDFViewer base64Data={base64Data}/>}
        </Suspense>
        }
      />
    </div>
  );
}
