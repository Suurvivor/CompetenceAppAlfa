import React from 'react';
import { User_dashboard_reminders_list_item } from './User_dashboard_reminders_list_item';
import { v4 as uuidv4 } from 'uuid';

export const User_dashboard_reminders_list = ({ authState }) => {
   return (
      <div id='user_dashboard_reminders'>
         <span id='user_dashboard_reminders_title'>Zaplanowane szkolenia</span>

         {authState.user.planedTraining.map((reminder) => (
            <User_dashboard_reminders_list_item reminder={reminder} key={uuidv4()} />
         ))}
      </div>
   );
};
