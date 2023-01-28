import React, { useState, useEffect } from 'react';
import { CalendarHeader } from './CalendarHeader/CalendarHeader';
import { Day } from './Day/Day';
import { useDate } from './hooks/useDate';
import { useAuth, loadUser } from '../../context/auth/AuthState';
import Spinner from '../layout/Spinner';
import { v4 as uuidv4 } from 'uuid';

export const Calendar = () => {
   const [authState, authDispatch] = useAuth();
   const [nav, setNav] = useState(0);
   //const [events, setEvents] = useState(authState.user.planedTraining);
   const [loading, setLoading] = useState(true);

   //const eventForDate = (date) => authState.user.planedTraining.find((e) => e.trainingDate === date);

   useEffect(() => {
      loadUser(authDispatch, setLoading);
   }, [authState.user.planedTraining]);

   const { days, dateDisplay } = useDate(authState.user.planedTraining, nav);
   if (!authState.user || loading === true) return <Spinner />;

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
                  <Day key={uuidv4()} day={d} userId={authState.user._id} />
               ))}
            </div>
         </div>
      </>
   );
};

export default Calendar;
