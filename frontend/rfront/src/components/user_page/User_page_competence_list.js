import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../context/auth/AuthState';
import { User_page_competence_list_group } from './User_page_competence_list_group';
import Spinner from '../layout/Spinner';

export const User_page_competence_list = () => {
   const [AuthState] = useAuth();
   const [competenceGroups, setCompetenceGroups] = useState({ groups: [], loading: true });
   useEffect(() => {
      const res = async () => {
         const groups = await axios.get(`/groupcompetences/workplace/${AuthState.user.workplace._id}`);
         const groupsWithUserRating = groups.data.data.map((group) => {
            let compListEdited = group.competenceListId.map((competence) => {
               let rating = AuthState.user.rating.find((rat1) => rat1.competence_id === competence._id);
               return rating
                  ? {
                       ...competence,
                       lastEdit: new Date(competence.lastEdit),
                       createdAt: new Date(competence.createdAt),
                       rating: {
                          ...rating,
                          created_at: new Date(rating.created_at),
                          lastmodify: new Date(rating.lastmodify),
                       },
                    }
                  : {
                       ...competence,
                       lastEdit: new Date(competence.lastEdit),
                       createdAt: new Date(competence.createdAt),
                       rating: null,
                    };
            });
            return { ...group, competenceListId: compListEdited };
         });
         setCompetenceGroups({ groups: groupsWithUserRating, loading: false });
      };
      res();
   }, []);
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
                     />
                  );
            })}
         </div>
      </>
   );
};
