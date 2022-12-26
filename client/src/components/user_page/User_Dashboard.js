import React from 'react';
import { User_dashboard_reminders_list } from './User_dashboard_reminders_list';
import { User_dashboard_user_info } from './User_dashboard_user_info';
import { useAuth } from '../../context/auth/AuthState';

export const User_Dashboard = () => {
   const [authState] = useAuth();
   return (
      <div id='user_dashboard'>
         <User_dashboard_user_info authState={authState} />
         <User_dashboard_reminders_list authState={authState} />
         <div id='user_dashboard_statistics'>to do</div>
      </div>
   );
};
