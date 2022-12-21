import React from 'react';
import { useBoxMidCard, setBoxMidCard } from '../../context/boxMidCard/BoxMidCardState';
export const User_dashboard_user_info = ({ authState }) => {
   const [boxMidCardState, boxMidCardDispatch] = useBoxMidCard();
   const { name, role, workplace } = authState.user;
   const editProfile = () => {
      return <p>Hello edit your shots</p>;
   };

   return (
      <div id='user_dashboard_info'>
         <i
            className='fa-solid fa-user-tie'
            id='user_dashborad_info_avatar'
            onClick={() => setBoxMidCard('Edit your profile', editProfile, boxMidCardDispatch)}
         ></i>
         <span id='user_dashboard_info_name'>{name}</span>
         <span id='user_dashboard_info_position'>Department: {workplace.department.name}</span>
         <span id='user_dashboard_info_department'>Workplace: {workplace.name}</span>
      </div>
   );
};
