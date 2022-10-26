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
         <User_Dashboard />
         {authState.user.workplace && <User_Competence_Board />}
      </>
   );
};
