import React from 'react';

const ItemEmpty = ({ setShow }) => {
   return (
      <div className='item item-empty' onClick={() => setShow(true)}>
         <i className='fa-solid fa-plus fa-4x'></i>
         <p>Dodaj nową grupe kompetencji</p>
      </div>
   );
};

export default ItemEmpty;
