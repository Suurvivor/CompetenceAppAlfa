import React, { useEffect } from 'react';

import { useAuth, getGroupedCompetences } from '../../context/auth/AuthState';

import { User_page_competence_list } from './User_page_competence_list';

import Spinner from '../layout/Spinner';

export const User_Competence_Board = () => {
   const [authState, authDispath] = useAuth();

   useEffect(() => {
      getGroupedCompetences(authDispath, authState.user);
   }, []);

   if (authState.competenceGroups.loading || authState.user.workplace === 'new') return <Spinner />;
   return (
      <div id='container'>
         <div className='flex-row'>
            {authState.competenceGroups.groups.length > 0 ? (
               <User_page_competence_list competenceGroups={authState.competenceGroups} />
            ) : (
               <p>Not found any competence groups connected, ask your supervisor to edit your account.</p>
            )}
         </div>
      </div>
   );
};
