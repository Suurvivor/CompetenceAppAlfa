import React, { useEffect, useState } from 'react';
import { User_Dashboard } from './User_Dashboard';
import { User_Competence_Board } from './User_Competence_Board';
import { useAuth, loadUser, getGroupedCompetences } from '../../context/auth/AuthState';
import Spinner from '../layout/Spinner';
export const User_page_index = () => {
   const [authState, authDispatch] = useAuth();
   //loadUser(authDispath);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      loadUser(authDispatch, setLoading);
   }, [loading]);
   if (loading || authState.loading) return <Spinner />;
   return (
      <>
         <>
            <User_Dashboard />
            <User_Competence_Board />
         </>
      </>
   );
};
