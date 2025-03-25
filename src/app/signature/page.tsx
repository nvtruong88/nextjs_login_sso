"use client";

import { lazy, Suspense, useState } from "react";
import FileUpload from "@/components/common/FileUpload";
const LazyPDFViewer = lazy(() => import("@/components/common/PDFViewer"));

export default function SignaturePage() {
  const [base64Data, setBase64Data] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.split(",")[1]; // Lấy phần base64 (bỏ "data:application/pdf;base64,")
        setBase64Data(base64String);
      };
    }
  };

  return (
    <section className="section profile">
      <div className="pagetitle">
      <h1>Profile</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="index.html">Home</a></li>
          <li className="breadcrumb-item">Users</li>
          <li className="breadcrumb-item active">Profile</li>
        </ol>
      </nav>
    </div>
      <div className="row">
        <div className="col-xl-8">
          {/* Upload File */}
          <FileUpload />
        </div>
        <div className="col-xl-4">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                <div className="col-lg-9 col-md-8">Kevin Anderson</div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                <div className="col-lg-9 col-md-8">Kevin Anderson</div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                <div className="col-lg-9 col-md-8">Kevin Anderson</div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                <div className="col-lg-9 col-md-8">Kevin Anderson</div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                <div className="col-lg-9 col-md-8">Kevin Anderson</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      {/* <PDFViewer base64Data={base64Data} />
       */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24">
              Đang tải dữ liệu...
            </div>
          </div>
        }
      >
        {/* Render LazyPDFViewer when base64PDF is available */}
        {base64Data && <LazyPDFViewer base64Data={base64Data} />}
      </Suspense>
    </section>
  );
}
