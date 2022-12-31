import React, { useState, useEffect } from 'react';
import { CalendarHeader } from './CalendarHeader/CalendarHeader';
import { Day } from './Day/Day';
import { NewEventModal } from './NewEventModal/NewEventModal';
import { DeleteEventModal } from './DeleteEventModal/DeleteEventModal';
import { useDate } from './hooks/useDate';
import { useAuth } from '../../context/auth/AuthState';
import Spinner from '../layout/Spinner';
export const Calendar = () => {
   const [authState, authDispatch] = useAuth();

   const [nav, setNav] = useState(0);
   const [clicked, setClicked] = useState();
   const [events, setEvents] = useState(authState.user.planedTraining);

   const eventForDate = (date) => events.find((e) => e.trainingDate === date);

   useEffect(() => {
      localStorage.setItem('events', JSON.stringify(events));
   }, [events]);

   const { days, dateDisplay } = useDate(events, nav);
   if (!authState.user) return <Spinner />;

   return (
      <>
         <div id='calendar_container'>
            <CalendarHeader dateDisplay={dateDisplay} onNext={() => setNav(nav + 1)} onBack={() => setNav(nav - 1)} />
            <div id='weekdays'>
               <div>Niedziela</div>
               <div>Poniedziałek</div>
               <div>Wtorek</div>
               <div>Środa</div>
               <div>Czwartek</div>
               <div>Piątek</div>
               <div>Sobota</div>
            </div>
            <hr />
            <div id='calendar'>
               {days.map((d, index) => (
                  <Day
                     key={index}
                     day={d}
                     onClick={() => {
                        if (d.value !== 'padding') {
                           setClicked(d.date);
                        }
                     }}
                     userId={authState.user._id}
                  />
               ))}
            </div>
         </div>

         {clicked && !eventForDate(clicked) && (
            <NewEventModal
               onClose={() => setClicked(null)}
               onSave={(title) => {
                  setEvents([...events, { title, date: clicked }]);
                  setClicked(null);
               }}
            />
         )}

         {clicked && eventForDate(clicked) && (
            <DeleteEventModal
               eventText={eventForDate(clicked).title}
               onClose={() => setClicked(null)}
               onDelete={() => {
                  setEvents(events.filter((e) => e.date !== clicked));
                  setClicked(null);
               }}
            />
         )}
      </>
   );
};

export default Calendar;
