import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const EventList = (day, userId) => {
   if (!day.event || day.event.length === 0) return 'Brak zaplanowanych wydarzeń';

   return (
      <div className='eventList'>
         <table>
            <thead>
               <tr>
                  <th>Time</th>
                  <th>Competence</th>
                  <th>Student</th>
                  <th>Trainer</th>
               </tr>
            </thead>
            <tbody>
               {day.event &&
                  day.event.map((ev, index) => {
                     let classNameForEvent = `eventBox ${ev.createdBy._id === userId && 'eventTrainer'}`;
                     console.log(ev);
                     const trainingDate = new Date(ev.trainingDate);
                     const time = `${trainingDate.getHours()}:${trainingDate.getMinutes()}`;
                     return (
                        <tr key={uuidv4()}>
                           <td>{time}</td>
                           <td>
                              {ev.competenceId.name.toString().length >= 30
                                 ? `${ev.competenceId.name.slice(0, 30)}..`
                                 : ev.competenceId.name}
                           </td>
                           <td title={ev.createdBy.workplace.name}>{ev.createdBy.name}</td>
                           <td title={ev.trainedUserId.workplace.name}>{ev.trainedUserId.name}</td>
                        </tr>
                     );
                  })}
            </tbody>
         </table>
      </div>
   );
};

export default EventList;
