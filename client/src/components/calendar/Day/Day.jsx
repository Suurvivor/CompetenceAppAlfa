import React from 'react';

export const Day = ({ day, onClick }) => {
   let time = '';

   if (day.event != undefined || day.event != null) {
      const trainingDate = new Date(day.event.trainingDate);
      time = `${trainingDate.getHours()}:${trainingDate.getMinutes()}`;
   }

   const className = `day ${day.value === 'padding' ? 'paddingDay' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;
   return (
      <div onClick={onClick} className={className}>
         {day.value === 'padding' ? '' : day.value}
         {day.event && (
            <div className='event'>
               {day.event.competenceId.name}
               {time}
            </div>
         )}
      </div>
   );
};

export default Day;
