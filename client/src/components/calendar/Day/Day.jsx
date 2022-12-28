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
               {time}{' '}
               {day.event.competenceId.name.toString().length >= 4
                  ? `${day.event.competenceId.name.slice(0, 4)}..`
                  : day.event.competenceId.name}
            </div>
         )}
      </div>
   );
};

export default Day;
