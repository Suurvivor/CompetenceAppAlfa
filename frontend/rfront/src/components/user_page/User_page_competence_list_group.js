import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User_page_competence_list_group_item } from './User_page_competence_list_group_item';

export const User_page_competence_list_group = ({ name, competenceList, inspect = false }) => {
   return (
      <div className='item'>
         <table>
            <thead>
               <tr>
                  <th>Id</th>
                  <th>{name}</th>
                  <th>Ocena</th>
                  {inspect && <th>Action</th>}
               </tr>
            </thead>
            <tbody>
               {competenceList.map((competence, index) => (
                  <User_page_competence_list_group_item
                     key={uuidv4()}
                     competence={competence}
                     index={index}
                     inspect={inspect}
                  />
               ))}
            </tbody>
         </table>
      </div>
   );
};
