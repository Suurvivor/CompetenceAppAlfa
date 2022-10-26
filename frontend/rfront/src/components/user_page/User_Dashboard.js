import React from 'react';
import { User_dashboard_reminders_list } from './User_dashboard_reminders_list';
import { User_dashboard_user_info } from './User_dashboard_user_info';

export const User_Dashboard = () => {
   return (
      <div id='user_dashboard'>
         <User_dashboard_user_info />
         <User_dashboard_reminders_list />
         <div id='user_dashboard_statistics'>to do</div>
      </div>
   );
};
