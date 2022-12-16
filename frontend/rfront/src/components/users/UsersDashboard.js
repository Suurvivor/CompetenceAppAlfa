import React from 'react';

const UsersDashboard = ({ user }) => {
   return (
      <div id='user_dashboard'>
         <div id='user_dashboard_info'>
            <i className='fa-solid fa-user-tie' id='user_dashborad_info_avatar'></i>
            <span id='user_dashboard_info_name'>{user.name}</span>
            <span id='user_dashboard_info_position'>Department: {user.workplace.department.name}</span>
            <span id='user_dashboard_info_department'>Workplace: {user.workplace.name}</span>
         </div>
         <div id='user_dashboard_statistics'>to do</div>
      </div>
   );
};

export default UsersDashboard;
