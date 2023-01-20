import React, { useEffect } from 'react';
import { User_dashboard_reminders_list } from './User_dashboard_reminders_list';
import { User_dashboard_user_info } from './User_dashboard_user_info';
import { useAuth } from '../../context/auth/AuthState';
import CircleProgresBar from '../statistics/CircleProgresBar';
import { countTotalRating } from '../../utils/countTotalRating';

export const User_Dashboard = () => {
   const [authState] = useAuth();
   //const ratingInfo = countTotalRating(authState.competenceGroups.groups);
   return (
      <div id='user_dashboard'>
         <User_dashboard_user_info authState={authState} />
         <User_dashboard_reminders_list planedTraining={authState.user.planedTraining} />
         <div id='user_dashboard_statistics'>
            <div className='dashboard_progresBar'>
               Total Score
               {authState.competenceGroups.loading ? (
                  'l o a d i n g...'
               ) : authState.competenceGroups.groups.length > 0 ? (
                  <CircleProgresBar fill={countTotalRating(authState.competenceGroups.groups).percent} />
               ) : (
                  <CircleProgresBar fill={0} />
               )}
            </div>
         </div>
      </div>
   );
};
