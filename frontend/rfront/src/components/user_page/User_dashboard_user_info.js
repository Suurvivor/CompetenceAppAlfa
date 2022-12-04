import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth/AuthState';
export const User_dashboard_user_info = () => {
   const [authState] = useAuth();
   const [dashboardInfo, setDashboardInfo] = useState({ department: '', workplace: '' });
   const { name, role, workplace } = authState.user;
   const [showBoxMidCard, setShowBoxMidCard] = useState(false);

   useEffect(() => {
      const getDashboardInfo = async () => {
         const workplaceData = await axios.get(`/workplaces/${workplace}`);
         const departmentData = await axios.get(`/departments/${workplaceData.data.data.department}`);
         setDashboardInfo({ department: departmentData.data.data.name, workplace: workplaceData.data.data.name });
      };
      getDashboardInfo();
   }, []);
   return (
      <div id='user_dashboard_info'>
         <i
            className='fa-solid fa-user-tie'
            id='user_dashborad_info_avatar'
            onClick={() => setShowBoxMidCard(true)}
         ></i>
         <span id='user_dashboard_info_name'>{name}</span>
         <span id='user_dashboard_info_position'>Department: {dashboardInfo.department}</span>
         <span id='user_dashboard_info_department'>Workplace: {dashboardInfo.workplace}</span>
         {showBoxMidCard && (
            <>
               <div className='boxMidCard'>
                  <div className='boxMidCard_topBar'>
                     <p className='boxMidCard_topBarTitle'>Edit your profile</p>
                     <i class='fa-solid fa-x boxMidCard_topBarIcon' onClick={() => setShowBoxMidCard(false)}></i>
                  </div>
               </div>
               <div className='blur' onClick={() => setShowBoxMidCard(false)}></div>
            </>
         )}
      </div>
   );
};
