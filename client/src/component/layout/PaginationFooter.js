import React, { useEffect, useMemo, useState } from "react"
import Pagination from 'react-bootstrap/Pagination';

const PaginationFooter = ({
   total = 0,
   itemsPerPage = 10,
   currentPage = 1,
   onPageChange }) => {

   const [totalPages, setTotalPage] = useState(0);

   useEffect(() => {
      if (total > 0 && itemsPerPage > 1) {
         setTotalPage(Math.ceil(total / itemsPerPage))
      }
   }, [total, itemsPerPage]);

   const paginationItems = useMemo(() => {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
         pages.push(
            <Pagination.Item
               key={i}
               active={i === currentPage}
               onClick={()=> onPageChange(i)}
            >
               {i}
            </Pagination.Item>
         )
      }
      return pages;
   }, [totalPages, currentPage]);

   if(totalPages === 0) return null;

   return (
      // <h1>Pagination</h1>
      <Pagination style={{ justifyContent: 'center' }}>
         <Pagination.Prev  
         onClick={()=>onPageChange(currentPage - 1)} disabled={currentPage === 1}
         />
         {paginationItems}
         <Pagination.Next 
         onClick={()=>onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
         />
         <Pagination.Last onClick={()=>onPageChange(currentPage === totalPages)}/>

      </Pagination>
   );


}
export default PaginationFooter;