import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth, getGroupedCompetences } from '../../context/auth/AuthState';
import { User_page_competence_list_group } from './User_page_competence_list_group';
import Spinner from '../layout/Spinner';

export const User_page_competence_list = () => {
   const [authState, authDispatch] = useAuth();

   if (authState.competenceGroups.loading) return <Spinner />;
   return (
      <>
         <div className='flex-column'>
            {authState.competenceGroups.groups.map((group, index) => {
               if (index < authState.competenceGroups.groups.length / 2)
                  return (
                     <User_page_competence_list_group
                        name={group.name}
                        competenceList={group.competenceListId}
                        key={uuidv4()}
                        inspect={false}
                     />
                  );
            })}
         </div>
         <div className='flex-column'>
            {authState.competenceGroups.groups.map((group, index) => {
               if (index >= authState.competenceGroups.groups.length / 2)
                  return (
                     <User_page_competence_list_group
                        name={group.name}
                        competenceList={group.competenceListId}
                        key={uuidv4()}
                        inspect={false}
                     />
                  );
            })}
         </div>
      </>
   );
};
