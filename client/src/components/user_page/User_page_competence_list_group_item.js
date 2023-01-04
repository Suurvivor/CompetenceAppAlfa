import React, { useState } from 'react';
import returnGrade from './utils/returnGrade';
import { useUsers, addRating, planTraining } from '../../context/users/UsersState';
import { formatDateCalendar, formatDate } from './utils/formatDate';
import { useBoxMidCard, setBoxMidCard, closeBoxMidCard } from '../../context/boxMidCard/BoxMidCardState';
import { useEffect } from 'react';
import { useAuth } from '../../context/auth/AuthState';

export const User_page_competence_list_group_item = ({ index, competence, inspect = false }) => {
   //console.log(competence);
   const [authState] = useAuth();
   const [usersState, usersDispatch] = useUsers();
   const [boxMidCardState, boxMidCardDispatch] = useBoxMidCard();
   const [planTrainingForm, setPlanTrainingForm] = useState({ date: formatDateCalendar(new Date(Date.now())) });
   const { name, rating, createdAt, lastEdit } = competence;

   const compBody = () => {
      return (
         <>
            <span className='BMCard_competenceTitle'>Competence name: '{name}'</span>
            <div className='BMCard_competenceContainer'>
               {rating ? (
                  <ul>
                     <li>Rating: {rating ? rating.rating : 'null'}</li>
                     <li>
                        Rating created at: {rating && formatDate(rating.created_at)} by {rating.created_by.name}
                     </li>
                     {rating.lastmodify_by !== null && (
                        <li>
                           Last Edit {formatDate(rating.lastmodify)} by {rating.lastmodify_by.name}
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

   const planTrainingBody = () => {
      return (
         <div className='planTrainBox'>
            <input
               type='datetime-local'
               value={planTrainingForm.date}
               min={formatDateCalendar(new Date(Date.now()))}
               onChange={(e) => onChangePlanTrainForm(e)}
               id='date'
               name='date'
               className='planTrainBox_date'
               autoFocus
            />
            <div>
               <p>Competence: {competence.name}</p>
               <p>Student: {usersState.user.name}</p>
               <p>Trainer: {authState.user.name}</p>
            </div>

            <button className='login_view_button' onClick={onPlanTraining}>
               SAVE
            </button>
         </div>
      );
   };

   const onChangePlanTrainForm = (e) => {
      setPlanTrainingForm({ date: e.target.value });
   };

   const onPlanTraining = async () => {
      planTraining(usersDispatch, {
         competenceId: competence._id,
         trainedUserId: usersState.user._id,
         trainingDate: planTrainingForm.date,
      });
      closeBoxMidCard(boxMidCardDispatch);
   };

   const onClick = () => {
      setBoxMidCard('Competence info', compBody, boxMidCardDispatch);
   };

   const onIncrease = () => {
      //console.log(competence.rating.rating.rating);
      if (competence.rating.rating) {
         if (competence.ratingSetting === 'from0to4') {
            if (competence.rating.rating !== 4) {
               addRating(usersDispatch, { ...usersState.user }, { ...competence }, competence.rating.rating + 1);
            }
         } else if (competence.ratingSetting === 'from0to1') {
            addRating(usersDispatch, { ...usersState.user }, { ...competence }, competence.rating.rating === 1 ? 0 : 1);
         }
      } else {
         addRating(usersDispatch, { ...usersState.user }, { ...competence }, 1);
      }
   };

   const onDecrease = () => {
      if (competence.rating.rating) {
         if (competence.ratingSetting === 'from0to4') {
            if (competence.rating.rating !== 0) {
               addRating(usersDispatch, { ...usersState.user }, { ...competence }, competence.rating.rating - 1);
            }
         }
      }
   };
   //console.log(competence.rating);
   useEffect(() => {
      if (boxMidCardState.show && inspect) setBoxMidCard('Zaplanuj szkolenie', planTrainingBody, boxMidCardDispatch);
   }, [planTrainingForm]);
   return (
      <>
         <tr className='cursor_pointer' onClick={() => inspect && onClick}>
            <td className='cursor_pointer' onClick={onClick}>
               {index + 1}
            </td>
            <td className='cursor_pointer' onClick={onClick}>
               {competence.name}
            </td>
            <td className='td_flex'>
               <div onClick={() => inspect && onIncrease()} className='cursor_pointer'>
                  {competence.rating.rating
                     ? returnGrade(competence.rating.rating, competence.ratingSetting)
                     : returnGrade(null, competence.ratingSetting)}
               </div>
               {inspect && competence.ratingSetting === 'from0to4' && (
                  <div className='arrows_increase_decrease'>
                     <i className='fa-solid fa-sort-up arrow_up' title='Increase' onClick={onIncrease}></i>
                     <i className='fa-solid fa-sort-down arrow_down' title='Decrease' onClick={onDecrease}></i>
                  </div>
               )}
            </td>
            {inspect && (
               <td onClick={() => setBoxMidCard('Zaplanuj szkolenie', planTrainingBody, boxMidCardDispatch)}>
                  <i className='fa-solid fa-calendar-plus inspect_calendar_icon' title='Zaplanuj szkolenie'></i>
               </td>
            )}
         </tr>
      </>
   );
};
