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
         const groups = await axios.get(`/groupcompetences/workplace/${AuthState.user.workplace}`);
         const groupsWithUserRating = groups.data.data.map((group) => {
            let compListEdited = group.competenceListId.map((competence) => {
               let rating = AuthState.user.rating.find((rat1) => rat1.competence_id === competence._id);
               return rating ? { ...competence, rating: rating.rating } : { ...competence, rating: null };
            });
            return { ...group, competenceListId: compListEdited };
         });
         console.log(groupsWithUserRating);
         setCompetenceGroups({ groups: groupsWithUserRating, loading: false });
      };
      res();
   }, []);
   if (competenceGroups.loading) return <Spinner />;
   return (
      <>
         <div className='flex-column'>
            {competenceGroups.groups.map((group) => (
               <User_page_competence_list_group
                  name={group.name}
                  competenceList={group.competenceListId}
                  key={uuidv4()}
               />
            ))}

            <div className='item item-empty'>
               <i className='fa-solid fa-plus fa-4x'></i>
               <p>Dodaj nową grupe kompetencji</p>
            </div>
         </div>
         <div className='flex-column'>
            <div className='item'>
               <table>
                  <thead>
                     <tr>
                        <th>Id</th>
                        <th>Przezbrajanie form wtryskowych</th>
                        <th>Ocena</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>1</td>
                        <td>Przezbrajanie formy nr W034342</td>
                        <td>1</td>
                        <td></td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div className='item'>
               <table>
                  <thead>
                     <tr>
                        <th>Id</th>
                        <th>Nazwa kompetencji</th>
                        <th>Ocena</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>1</td>
                        <td>Przezbrajanie formy nr W034342</td>
                        <td>
                           <i className='fa-solid fa-check green'></i>
                        </td>
                        <td>
                           <i className='fa-solid fa-calendar-days'></i>
                           <i className='fa-solid fa-gears'></i>
                        </td>
                     </tr>
                     <tr>
                        <td>1</td>
                        <td>Przezbrajanie formy nr W034342</td>
                        <td>
                           <i className='fa-solid fa-check green'></i>
                        </td>
                        <td>
                           <i className='fa-solid fa-calendar-plus'></i>
                        </td>
                     </tr>
                     <tr>
                        <td>1</td>
                        <td>Przezbrajanie formy nr W034342</td>
                        <td>
                           <i className='fa-solid fa-xmark red'></i>
                        </td>
                        <td></td>
                     </tr>
                     <tr>
                        <td>1</td>
                        <td>Przezbrajanie formy nr W034342</td>
                        <td></td>
                        <td></td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </>
   );
};
