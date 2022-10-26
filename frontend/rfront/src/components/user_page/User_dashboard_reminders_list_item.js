import React from 'react';

export const User_dashboard_reminders_list_item = () => {
   return (
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
   );
};
