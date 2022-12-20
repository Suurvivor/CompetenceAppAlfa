import React from 'react';
import returnGrade from './utils/returnGrade';
import { useUsers, addRating } from '../../context/users/UsersState';

import { useBoxMidCard, setBoxMidCard } from '../../context/boxMidCard/BoxMidCardState';

export const User_page_competence_list_group_item = ({ index, competence, inspect = false }) => {
   const [usersState, usersDispatch] = useUsers();
   const [boxMidCardState, boxMidCardDispatch] = useBoxMidCard();

   const { name, rating, createdAt, lastEdit } = competence;

   const formatDate = (date) => {
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
   };

   //console.log(competence.rating);
   const compBody = () => {
      return (
         <>
            <span className='BMCard_competenceTitle'>Competence name: '{name}'</span>
            <div className='BMCard_competenceContainer'>
               {rating ? (
                  <ul>
                     <li>Rating: {rating ? rating.rating : 'null'}</li>
                     <li>
                        Rating created at: {rating && formatDate(rating.created_at)} by {rating.created_by}
                     </li>
                     {rating.lastmodify_by !== null && (
                        <li>
                           Last Edit {formatDate(rating.lastmodify)} by {rating.lastmodify_by}
                        </li>
                     )}
                  </ul>
               ) : (
                  <ul>
                     <li>{rating ? rating.rating : 'Rating: null'}</li>
                  </ul>
               )}

               <ul className='BMCard_competenceInfo'>
                  <li>Competence Last Edit: {formatDate(lastEdit)}</li>
                  <li>Competence Created at: {formatDate(createdAt)}</li>
               </ul>
            </div>
         </>
      );
   };

   const onClick = () => {
      setBoxMidCard('Competence info', compBody, boxMidCardDispatch);
   };
   return (
      <>
         <tr>
            <td className='cursor_pointer' onClick={() => onClick()}>
               {index + 1}
            </td>
            <td className='cursor_pointer' onClick={() => onClick()}>
               {competence.name}
            </td>
            <td className='td_flex'>
               <div
                  onClick={() =>
                     competence.ratingSetting === 'from0to1' &&
                     addRating(
                        usersDispatch,
                        { ...usersState.user },
                        { ...competence },
                        competence.rating?.rating === 1 ? null : 1
                     )
                  }
                  className='cursor_pointer'
               >
                  {competence.rating
                     ? returnGrade(competence.rating.rating, competence.ratingSetting)
                     : returnGrade(null, competence.ratingSetting)}
               </div>
               {inspect && competence.ratingSetting === 'from0to4' && (
                  <div className='arrows_increase_decrease'>
                     <i
                        className='fa-solid fa-sort-up arrow_up'
                        onClick={() =>
                           competence.rating.rating !== 4 &&
                           addRating(
                              usersDispatch,
                              { ...usersState.user },
                              { ...competence },
                              competence.rating.rating + 1
                           )
                        }
                     ></i>
                     <i
                        className='fa-solid fa-sort-down arrow_down'
                        onClick={() =>
                           competence.rating.rating !== 0 &&
                           addRating(
                              usersDispatch,
                              { ...usersState.user },
                              { ...competence },
                              competence.rating.rating - 1
                           )
                        }
                     ></i>
                  </div>
               )}
            </td>
            {inspect && (
               <td>
                  <i className='fa-solid fa-calendar-plus'></i>
               </td>
            )}
         </tr>
      </>
   );
};
