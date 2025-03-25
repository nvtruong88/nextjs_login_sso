"use client"; // Chỉ định đây là Client Component
import localFont from "next/font/local";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons CSS
import "glightbox/dist/css/glightbox.css"; // Import Glightbox CSS

import "glightbox"; // Import Glightbox JS
// import 'swiper/swiper-bundle.min.css'; // Import Swiper CSS
import "./globals.css";

import Header from "@/components/home/Header";
import SideBar from "@/components/home/sidebar";
import Footer from "@/components/home/footer";
import SessionProviderWrapper from "@/components/common/SessionProviderWrapper";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "./loading";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

type AuthResponse = {
  permissions: string[];
  message: string;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname(); // Theo dõi đường dẫn hiện tại

  useEffect(() => {
    setLoading(true); // Hiện loading khi bắt đầu chuyển trang

    const timer = setTimeout(() => {
      setLoading(false); // Ẩn loading sau khi trang mới render xong
    }, 500); // Giữ loading trong ít nhất 500ms để tránh flicker
    
    if (typeof window !== "undefined") {
      console.log(window);
    }
    return () => clearTimeout(timer); // Dọn dẹp timeout khi component unmount
  }, [pathname]); // Chạy lại khi pathname thay đổi

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      </head>
      <body className="index-page scrolled">
        <SessionProviderWrapper>
          <div id="page-wrap">
            <Header fullName={""} />
            <div className="main-wrapper docsWrapper">
              <div className="docPage">
                <SideBar/>
                <main id="main" className="main">
                  {loading && (
                    <Loading/>
                  )}
                  {children}
                </main>
              </div>
            </div>
            <Footer />
          </div>
        </SessionProviderWrapper>
        {/* Scroll Top */}
        <a
          href="#"
          id="scroll-top"
          className="scroll-top d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-arrow-up-short"></i>
        </a>
        {/* Vendor JS Files  */}
        {/* Load TinyMCE */}
      <Script
        src="/scripts/vendors/tinymce.min.js"
        strategy="afterInteractive"
      />
      
      {/* Load main.js sau khi trang hiển thị */}
      <Script
        src="/scripts/main.js"
        strategy="afterInteractive"
      />
      </body>
    </html>
  );
}
