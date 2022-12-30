import React from 'react';

export const CalendarHeader = ({ onNext, onBack, dateDisplay }) => {
   return (
      <div id='calendar_header'>
         <div id='monthDisplay'>{dateDisplay}</div>
         <div>
            <button className='users_list_item_button' onClick={onBack} id='backButton'>
               <i className='fa-solid fa-chevron-left'></i> Poprzedni
            </button>
            <button className='users_list_item_button' onClick={onNext} id='nextButton'>
               Następny <i className='fa-solid fa-chevron-right'></i>
            </button>
         </div>
      </div>
   );
};

export default CalendarHeader;
