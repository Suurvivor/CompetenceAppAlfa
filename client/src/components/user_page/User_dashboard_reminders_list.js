import React from 'react';
import { User_dashboard_reminders_list_item } from './User_dashboard_reminders_list_item';
import { v4 as uuidv4 } from 'uuid';

export const User_dashboard_reminders_list = ({ planedTraining = [] }) => {
   const planedTrainingWithoutDeprecated = planedTraining.filter(
      (reminder) => new Date(reminder.trainingDate) > Date.now()
   );
   return (
      <div id='user_dashboard_reminders'>
         <span id='user_dashboard_reminders_title'>
            {planedTrainingWithoutDeprecated.length > 0 ? 'Zaplanowane szkolenia' : 'Brak zaplanowanych szkoleń'}
         </span>

         {planedTrainingWithoutDeprecated.map(
            (reminder, index) => index < 3 && <User_dashboard_reminders_list_item reminder={reminder} key={uuidv4()} />
         )}
      </div>
   );
};
