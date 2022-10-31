import React from 'react';

const CompetenceListItem = ({ index, name }) => {
   return (
      <tr>
         <td>{index}</td>
         <td>{name}</td>
         <td>
            <select name='' id='' defaultValue='from0to4'>
               <option value='from0to1'>0 - 1</option>
               <option value='from0to4'>0 - 4</option>
            </select>
         </td>
         <td>
            <i className='fa-solid fa-gears'></i>
         </td>
      </tr>
   );
};

export default CompetenceListItem;
