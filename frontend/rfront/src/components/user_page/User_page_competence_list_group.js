import React from 'react';
import { User_page_competence_list_group_item } from './User_page_competence_list_group_item';

export const User_page_competence_list_group = () => {
   return (
      <div className='item'>
         <table>
            <thead>
               <tr>
                  <th>Id</th>
                  <th>Przezbrajanie form</th>
                  <th>Ocena</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               <User_page_competence_list_group_item />
               <tr>
                  <td>1</td>
                  <td>Przezbrajanie formy nr W034342</td>
                  <td>
                     <div id='circle'>
                        <div id='circle_number'>3</div>
                        <div id='box_top_left'></div>
                        <div id='box_top_right'></div>
                        <div id='box_bot_left'></div>
                        <div id='box_bot_right'></div>
                     </div>
                  </td>
                  <td>
                     <i className='fa-solid fa-calendar-plus'></i>
                  </td>
               </tr>
               <tr>
                  <td>1</td>
                  <td>Przezbrajanie formy nr W034342</td>
                  <td>
                     <i className='fa-solid fa-xmark red'></i>
                  </td>
                  <td></td>
               </tr>
               <tr>
                  <td>1</td>
                  <td>Przezbrajanie formy nr W034342</td>
                  <td></td>
                  <td></td>
               </tr>
            </tbody>
         </table>
      </div>
   );
};
