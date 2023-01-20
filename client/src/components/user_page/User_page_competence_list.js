import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User_page_competence_list_group } from './User_page_competence_list_group';
import Spinner from '../layout/Spinner';

export const User_page_competence_list = ({ competenceGroups }) => {
   console.log(competenceGroups);
   if (competenceGroups.loading) return <Spinner />;
   return (
      <>
         <div className='flex-column'>
            {competenceGroups.groups.map((group, index) => {
               if (index < competenceGroups.groups.length / 2)
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
            {competenceGroups.groups.map((group, index) => {
               if (index >= competenceGroups.groups.length / 2)
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
