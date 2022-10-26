import React from 'react';
import { useAuth } from '../../context/auth/AuthState';
export const User_dashboard_user_info = () => {
   const [authState] = useAuth();

   const { name, role } = authState.user;
   return (
      <div id='user_dashboard_info'>
         <i
            className='fa-solid fa-user-tie'
            id='user_dashborad_info_avatar'
         ></i>
         <span id='user_dashboard_info_name'>{name}</span>
         <span id='user_dashboard_info_position'>Position: {role}</span>
         <span id='user_dashboard_info_department'>
            Department: Produkcja - Wtrysk
         </span>
      </div>
   );
};
