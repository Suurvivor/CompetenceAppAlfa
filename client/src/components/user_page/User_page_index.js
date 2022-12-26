import React, { useEffect, useState } from 'react';
import { User_Dashboard } from './User_Dashboard';
import { User_Competence_Board } from './User_Competence_Board';
import { useAuth, loadUser } from '../../context/auth/AuthState';
import Spinner from '../layout/Spinner';
export const User_page_index = () => {
   const [authState, authDispath] = useAuth();
   //loadUser(authDispath);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      loadUser(authDispath, setLoading);
   }, []);
   if (loading) return <Spinner />;
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
