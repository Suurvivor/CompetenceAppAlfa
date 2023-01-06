import React, { useState, useEffect } from 'react';

const CircleProgresBar = ({ fill = 0 }) => {
   fill = Math.round(fill);
   if (fill > 100) fill = 100;
   if (fill < 0) fill = 0;
   const [number, setNumber] = useState(0);
   const get_fill = (procenty) => Math.round((procenty * 490) / 100);
   const get_fill_time = (fill) => Math.round((490 * 20) / fill);

   let style = { '--offset': get_fill(100 - fill) };
   useEffect(() => {
      let counter = 0;
      setInterval(() => {
         if (counter == fill) {
            clearInterval();
         } else {
            counter += 1;
            setNumber(counter);
         }
      }, get_fill_time(get_fill(fill)));
   }, []);

   return (
      <div className='skill' id='user_dashboard_statistics_skill'>
         <div className='outer'>
            <div className='inner'>
               <div id='number'>{number}%</div>
            </div>
         </div>
         <svg
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            width='160px'
            height='160px'
            style={{ '--offset': get_fill(100 - fill) }}
         >
            <defs>
               <linearGradient id='GradientColor'>
                  <stop offset='0%' stopColor='#e91e63' />
                  <stop offset='100%' stopColor='#673ab7' />
               </linearGradient>
            </defs>
            <circle cx='80' cy='80' r='77' strokeLinecap='round' />
         </svg>
      </div>
   );
};

export default CircleProgresBar;
