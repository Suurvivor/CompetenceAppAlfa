import React, { useState } from 'react';
import returnGrade from './utils/returnGrade';

import { useBoxMidCard, setBoxMidCard, closeBoxMidCard } from '../../context/boxMidCard/BoxMidCardState';

export const User_page_competence_list_group_item = ({ index, competence }) => {
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
         <tr onClick={() => onClick()}>
            <td>{index + 1}</td>
            <td>{competence.name}</td>
            <td>
               {competence.rating
                  ? returnGrade(competence.rating.rating, competence.ratingSetting)
                  : returnGrade(null, competence.ratingSetting)}
            </td>
         </tr>
      </>
   );
};
