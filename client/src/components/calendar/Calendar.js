import React, { useState, useEffect } from 'react';
import { CalendarHeader } from './CalendarHeader/CalendarHeader';
import { Day } from './Day/Day';
import { useDate } from './hooks/useDate';
import { useAuth } from '../../context/auth/AuthState';
import Spinner from '../layout/Spinner';

export const Calendar = () => {
   const [authState, authDispatch] = useAuth();
   const [nav, setNav] = useState(0);
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
                  <Day key={index} day={d} userId={authState.user._id} />
               ))}
            </div>
         </div>
      </>
   );
};

export default Calendar;
