// import { useState, useCallback } from "react";

// const useDetailsFetching = (apiService: any) => {
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const getDetails = useCallback(
//     async (id: number) => {
//       setLoading(true); // Bắt đầu loading
//       setError(null); // Xóa trạng thái lỗi trước khi gọi API

//       try {
//         const endpoint = `/api/cms/request-cert/detail?id=${id}`;
//         const result = await apiService(endpoint, "GET");

//         if (result.status === "SUCCESS") {
//           const responseData = result.meta_data.select_multi;
//           setData(responseData);
//           console.log("Data fetched successfully:", responseData);
//         } else {
//           const errorMsg = result.description || "API Error";
//           setError(errorMsg);
//           console.warn("API responded with an error:", errorMsg);
//         }
//       } catch (err) {
//         setError("Network or parsing error occurred.");
//         console.error("Network or parsing error:", err);
//       } finally {
//         setLoading(false); // Kết thúc loading
//       }
//     },
//     [apiService]
//   );

//   return { data, loading, error, getDetails };
// };

// export default useDetailsFetching;