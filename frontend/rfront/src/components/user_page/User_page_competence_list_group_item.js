import React from 'react';

export const User_page_competence_list_group_item = (props) => {
   console.log(props);
   const { index, competence } = props;

   return (
      <tr>
         <td>{index}</td>
         <td>{competence.name}</td>
         <td>grade</td>
         <td>
            <i className='fa-solid fa-calendar-plus'></i>
            <i className='fa-solid fa-gears'></i>
         </td>
      </tr>
   );
};
