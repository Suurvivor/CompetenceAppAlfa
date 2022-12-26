import React from 'react';
import { formatDate } from './utils/formatDate';

export const User_dashboard_reminders_list_item = ({ reminder }) => {
   return (
      <div className='user_dashboard_reminders_item'>
         <i className='fa-regular fa-bell' id='user_dashboard_reminders_item_icon'></i>
         <span id='reminders_item_title'>{reminder.competenceId.name}</span>
         <div id='reminders_item_date'>
            <span className='badge badge-error'>{formatDate(new Date(reminder.trainingDate))}</span>
         </div>
      </div>
   );
};
