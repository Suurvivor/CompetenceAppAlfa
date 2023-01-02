import React from 'react';
import { useBoxMidCard, setBoxMidCard, closeBoxMidCard } from '../../../context/boxMidCard/BoxMidCardState';
import EventList from './EventList';
import { v4 as uuidv4 } from 'uuid';
export const Day = ({ day, userId }) => {
   const [boxMidCardState, boxMidCardDispatch] = useBoxMidCard();
   // let time = '';

   // if (day.event != undefined || day.event != null) {
   //    const trainingDate = new Date(day.event.trainingDate);
   //    time = `${trainingDate.getHours()}:${trainingDate.getMinutes()}`;
   // }

   const dayInfoBody = () => {
      return EventList(day, userId);
   };

   const onClick = () => {
      setBoxMidCard(`DATE: ${day.date}`, dayInfoBody, boxMidCardDispatch);
   };
   const className = `day ${day.value === 'padding' ? 'paddingDay' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;

   return (
      <div onClick={onClick} className={className}>
         {day.value === 'padding' ? '' : day.value}
         <div>
            {day.event &&
               day.event.map((ev, index) => {
                  let classNameForEvent = `event ${ev.createdBy._id == userId && 'eventTrainer'}`;
                  if (index > 2) return '';
                  const trainingDate = new Date(ev.trainingDate);
                  const time = `${trainingDate.getHours()}:${trainingDate.getMinutes()}`;
                  return (
                     <div className={classNameForEvent} key={uuidv4()}>
                        {time}{' '}
                        {ev.competenceId.name.toString().length >= 10
                           ? `${ev.competenceId.name.slice(0, 10)}..`
                           : ev.competenceId.name}
                     </div>
                  );
               })}
         </div>
      </div>
   );
};

export default Day;
