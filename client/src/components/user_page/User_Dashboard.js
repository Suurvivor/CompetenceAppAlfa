import React from 'react';
import { User_dashboard_reminders_list } from './User_dashboard_reminders_list';
import { User_dashboard_user_info } from './User_dashboard_user_info';
import { useAuth } from '../../context/auth/AuthState';
import CircleProgresBar from '../statistics/CircleProgresBar';

export const User_Dashboard = () => {
   const [authState] = useAuth();
   return (
      <div id='user_dashboard'>
         <User_dashboard_user_info authState={authState} />
         <User_dashboard_reminders_list planedTraining={authState.user.planedTraining} />
         <div id='user_dashboard_statistics'>
            <div className='dashboard_progresBar'>
               Total Score
               <CircleProgresBar fill={50} />
            </div>
         </div>
      </div>
   );
};
