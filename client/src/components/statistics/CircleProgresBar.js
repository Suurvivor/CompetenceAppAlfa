import React, { useState, useEffect, useRef } from 'react';
export const get_fill = (procenty) => Math.round((procenty * 490) / 100);
export const get_fill_time = (fill) => Math.round((490 * 20) / fill);

const CircleProgresBar = ({ fill = 0 }) => {
   fill = Math.round(fill);
   if (fill > 100) fill = 100;
   if (fill < 0) fill = 0;
   const [number, setNumber] = useState(fill);
   const [style, setStyle] = useState({ '--offset': get_fill(100 - fill) });
   const prevNumber = useRef(0);

   //let style = { '--offset': get_fill(100 - fill) };
   useEffect(() => {
      let counter = 0;
      if (number < prevNumber.current) {
         counter = number;
      } else if (number > prevNumber.current) {
         //counter = prevNumber.current;
      }
      //console.log(prevNumber.current);
      setInterval(() => {
         if (counter == fill) {
            clearInterval();
         } else {
            // number < prevNumber.current ? (counter += 1) : (counter -= 1);
            counter += 1;
            //console.log(counter);
            setStyle({ '--offset': get_fill(100 - counter) });
            setNumber(counter);
            prevNumber.current = number;
         }
      }, get_fill_time(get_fill(fill)));
      console.log(counter);
      console.log(`number: ${number} : prevNumber: ${prevNumber.current}`);
   }, [fill]);

   return (
      <div className='skill' id='user_dashboard_statistics_skill'>
         <div className='outer'>
            <div className='inner'>
               <div id='number'>{number}%</div>
            </div>
         </div>
         <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='160px' height='160px' style={style}>
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
