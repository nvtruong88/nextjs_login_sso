// // RootLayout.tsx
// "use client"; // Ensure this is at the top of the file

// import Swal from 'sweetalert2';
// import { useEffect, useState } from "react"; // Import useEffect
// import { SessionProvider } from "next-auth/react";
// import type { AppProps } from "next/app";
// import localFont from "next/font/local";
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons CSS
// import 'glightbox/dist/css/glightbox.css'; // Import Glightbox CSS
// import 'glightbox'; // Import Glightbox JS
// // import 'swiper/swiper-bundle.min.css'; // Import Swiper CSS
// import "./globals.css";

// import Header from "@/components/home/Header";
// import SideBar from "@/components/home/sidebar";
// import Footer from "@/components/home/footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// type AuthResponse = {
//   permissions: string[];
//   message: string;
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const [adminName, setAdminName] = useState<string | null>(null);
//   // Chạy effect này một lần khi component mount
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       // Access window-related functionality here
//       console.log(window.location.href);
//     }
//     authentication()
//   }, []); 

//   const authentication = async (): Promise<void> => {
//     try {
//       const url = "https://test-cms.vnpt-ca.vn:443/api/cms/authentication";
//       const response = await fetch(url, { method: "GET" });
//       if (!response.ok) {
//         Swal.fire({
//           title: 'Success!',
//           text: 'Your action was successful.',
//           icon: 'success',
//           confirmButtonText: 'Okay',
//         });
//       }
  
//       const result = await response.json();
//       console.log("API response:", result);

//       if (result.meta_data && result.meta_data.admin_name) {
//         setAdminName(result.meta_data.admin_name);  // Set adminName in state
//       } else {
//         console.warn("Admin name not found in the response.");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };

//   return (
//     <html lang="en">
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
//         {/* Google Fonts */}
//         <link
//           href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body className="index-page scrolled">
//         <div id="page-wrap">
//           <Header fullName={adminName} />
//           <div className="main-wrapper docsWrapper">
//             <div className="docPage">
//               <SideBar />
//               <main id="main" className="main">
//                 {children}
//               </main>
//             </div>
//           </div>
//           <Footer />
//         </div>

//         {/* Scroll Top */}
//         <a
//           href="#"
//           id="scroll-top"
//           className="scroll-top d-flex align-items-center justify-content-center"
//         >
//           <i className="bi bi-arrow-up-short"></i>
//         </a>
//       </body>
//     </html>
//   );
// }
