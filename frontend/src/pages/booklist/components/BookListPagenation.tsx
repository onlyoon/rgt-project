// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"

// const BookListPagenation = (count: number) => {


//   const itemsPerPage = 10;

//   const totalPages = Math.ceil(count / itemsPerPage);

//   console.log(`totalPages: `, totalPages)


//   return (
//     <Pagination>
//       <PaginationContent>
//         <PaginationItem>
//           <PaginationPrevious
//             href=""
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//           // disabled={currentPage === 1}
//           />
//         </PaginationItem>
//         {[...Array(totalPages)].map((_, index) => (
//           <PaginationItem key={index}>
//             <PaginationLink
//               href="#"
//               onClick={() => setCurrentPage(index + 1)}
//               isActive={currentPage === index + 1}
//             >
//               {index + 1}
//             </PaginationLink>
//           </PaginationItem>
//         ))}
//         <PaginationItem>
//           <PaginationNext
//             href=""
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//           // disabled={currentPage === totalPages}
//           />
//         </PaginationItem>
//       </PaginationContent>
//     </Pagination>
//   );
// }

// export default BookListPagenation