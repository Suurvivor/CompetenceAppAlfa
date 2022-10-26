import React from 'react';
import { User_dashboard_reminders_list_item } from './User_dashboard_reminders_list_item';

export const User_dashboard_reminders_list = () => {
   return (
      <div id='user_dashboard_reminders'>
         <span id='user_dashboard_reminders_title'>Zaplanowane szkolenia</span>

         <User_dashboard_reminders_list_item />
         <div className='user_dashboard_reminders_item'>
            <i
               className='fa-regular fa-bell'
               id='user_dashboard_reminders_item_icon'
            ></i>
            <span id='reminders_item_title'>
               Przezbrajanie formy wtryskowej nr W0345
            </span>
            <div id='reminders_item_date'>
               <span className='badge badge-error'>20.01.3021</span>
            </div>
         </div>
         <div className='user_dashboard_reminders_item'>
            <i
               className='fa-regular fa-bell'
               id='user_dashboard_reminders_item_icon'
            ></i>
            <span id='reminders_item_title'>
               Przezbrajanie formy wtryskowej nr W0345
            </span>
            <div id='reminders_item_date'>
               <span className='badge badge-error'>20.01.3021</span>
            </div>
         </div>
      </div>
   );
};
