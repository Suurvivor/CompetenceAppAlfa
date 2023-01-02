import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const EventList = (day, userId) => {
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

                     const trainingDate = new Date(ev.trainingDate);
                     const time = `${trainingDate.getHours()}:${trainingDate.getMinutes()}`;
                     return (
                        <tr>
                           <td>{time}</td>
                           <td>
                              {ev.competenceId.name.toString().length >= 30
                                 ? `${ev.competenceId.name.slice(0, 30)}..`
                                 : ev.competenceId.name}
                           </td>
                           <td>{ev.createdBy.name}</td>
                           <td>{ev.trainedUserId.name}</td>
                        </tr>
                     );
                  })}
            </tbody>
         </table>
      </div>
   );
};

export default EventList;
