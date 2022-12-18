import React from 'react';
import { User_Dashboard } from './User_Dashboard';
import { User_Competence_Board } from './User_Competence_Board';
import { useAuth } from '../../context/auth/AuthState';
import Spinner from '../layout/Spinner';
export const User_page_index = () => {
   const [authState] = useAuth();
   if (!authState.user) return <Spinner />;
   return (
      <>
         {authState.user.workplace && authState.user.workplace.department ? (
            <>
               <User_Dashboard />
               <User_Competence_Board />
            </>
         ) : (
            <div>You need to be added to some department please contact with your supervisor.</div>
         )}
      </>
   );
};
