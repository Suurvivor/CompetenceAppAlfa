import React from 'react';
import { User_page_competence_list_group } from './User_page_competence_list_group';

export const User_page_competence_list = () => {
   return (
      <>
         <div className='flex-column'>
            <User_page_competence_list_group />
            <div className='item item-empty'>
               <i className='fa-solid fa-plus fa-4x'></i>
               <p>Dodaj nową grupe kompetencji</p>
            </div>
         </div>
         <div className='flex-column'>
            <div className='item'>
               <table>
                  <thead>
                     <tr>
                        <th>Id</th>
                        <th>Przezbrajanie form wtryskowych</th>
                        <th>Ocena</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>1</td>
                        <td>Przezbrajanie formy nr W034342</td>
                        <td>1</td>
                        <td></td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div className='item'>
               <table>
                  <thead>
                     <tr>
                        <th>Id</th>
                        <th>Nazwa kompetencji</th>
                        <th>Ocena</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>1</td>
                        <td>Przezbrajanie formy nr W034342</td>
                        <td>
                           <i className='fa-solid fa-check green'></i>
                        </td>
                        <td>
                           <i className='fa-solid fa-calendar-days'></i>
                           <i className='fa-solid fa-gears'></i>
                        </td>
                     </tr>
                     <tr>
                        <td>1</td>
                        <td>Przezbrajanie formy nr W034342</td>
                        <td>
                           <i className='fa-solid fa-check green'></i>
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
         </div>
      </>
   );
};
