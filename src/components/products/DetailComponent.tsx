// import React, { useEffect } from "react";
// import useDetailsFetching from "./api/useDetailsFetching";
// import { apiService } from "@/services/apiService";

// const DetailPage = ({ id }: { id: number }) => {
//   const { data, loading, error, getDetails } = useDetailsFetching(apiService);

//   useEffect(() => {
//     if (id) getDetails(id);
//   }, [id, getDetails]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Chi tiết</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default DetailPage;
