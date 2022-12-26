import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User_page_competence_list_group } from '../user_page/User_page_competence_list_group';
const UsersCompetenceList = ({ usersState }) => {
   if (!usersState.userCompetences) return null;
   return (
      <div id='container'>
         <div className='flex-row'>
            <div className='flex-column'>
               {usersState.userCompetences.map((group, index) => {
                  if (index < usersState.userCompetences.length / 2)
                     return (
                        <User_page_competence_list_group
                           name={group.name}
                           competenceList={group.competenceListId}
                           key={uuidv4()}
                           inspect={true}
                        />
                     );
               })}
            </div>
            <div className='flex-column'>
               {usersState.userCompetences.map((group, index) => {
                  if (index >= usersState.userCompetences.length / 2)
                     return (
                        <User_page_competence_list_group
                           name={group.name}
                           competenceList={group.competenceListId}
                           key={uuidv4()}
                           inspect={true}
                        />
                     );
               })}
            </div>
         </div>
      </div>
   );
};

export default UsersCompetenceList;
