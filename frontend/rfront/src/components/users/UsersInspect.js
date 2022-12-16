import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { User_page_competence_list_group } from '../user_page/User_page_competence_list_group';
import Spinner from '../layout/Spinner';

export const UsersInspect = ({ user, userId }) => {
   const [competenceGroups, setCompetenceGroups] = useState({ groups: [], loading: true });

   // const getUser = async () => {
   //    const req = await axios.get(`users/${userId}`);
   //    setUser(req.data.data);
   // };

   const getCompetenceGroups = async () => {
      const groups = await axios.get(`/groupcompetences/workplace/${user.workplace._id}`);
      const groupsWithUserRating = groups.data.data.map((group) => {
         let compListEdited = group.competenceListId.map((competence) => {
            let rating = user.rating.find((rat1) => rat1.competence_id === competence._id);
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
   useEffect(() => {
      //getUser();

      getCompetenceGroups();
   }, []);
   if (competenceGroups.loading) return <Spinner />;
   return (
      <div id='container'>
         <div className='flex-row'>
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
         </div>
      </div>
   );
};

export default UsersInspect;
