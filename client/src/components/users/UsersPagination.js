import React from 'react';

const UsersPagination = ({ page, setPage, total, pagination }) => {
   return (
      <div className='users_pagination'>
         <p>Total found: {total}</p>
         <p>actual page: {page}</p>
         {pagination?.prev?.page && (
            <span onClick={() => setPage(parseInt(pagination.prev.page))}>
               prev_page({parseInt(pagination?.prev?.page)}){' '}
            </span>
         )}
         {pagination?.next?.page && (
            <span onClick={() => setPage(parseInt(pagination.next.page))}>
               next_page({parseInt(pagination?.next?.page)})
            </span>
         )}
      </div>
   );
};

export default UsersPagination;
