import React from 'react';

const returnGrade = (grade, ratingSetting) => {
   if (ratingSetting === 'from0to1') {
      switch (grade) {
         case 0:
         case null:
         case 'null':
         case '0':
            return <i className='fa-solid fa-xmark red'></i>;
         case 1:
         case '1':
            return <i className='fa-solid fa-check green'></i>;

         default:
            break;
      }
   } else if (ratingSetting === 'from0to4') {
      switch (grade) {
         case 0:
         case '0':
         case null:
            return (
               <div id='circle'>
                  <div id='circle_number'>0</div>
                  <div id='box_top_left display_none'></div>
                  <div id='box_top_right display_none'></div>
                  <div id='box_bot_left display_none'></div>
                  <div id='box_bot_right display_none'></div>
               </div>
            );
         case 1:
         case '1':
            return (
               <div id='circle'>
                  <div id='circle_number'>1</div>
                  <div id='box_top_left display_none'></div>
                  <div id='box_top_right'></div>
                  <div id='box_bot_left display_none'></div>
                  <div id='box_bot_right display_none'></div>
               </div>
            );
         case 2:
         case '2':
            return (
               <div id='circle'>
                  <div id='circle_number'>2</div>
                  <div id='box_top_left display_none'></div>
                  <div id='box_top_right'></div>
                  <div id='box_bot_left display_none'></div>
                  <div id='box_bot_right'></div>
               </div>
            );
         case 3:
         case '3':
            return (
               <div id='circle'>
                  <div id='circle_number'>3</div>
                  <div id='box_top_left display_none'></div>
                  <div id='box_top_right'></div>
                  <div id='box_bot_left'></div>
                  <div id='box_bot_right'></div>
               </div>
            );
         case 4:
         case 4:
            return (
               <div id='circle'>
                  <div id='circle_number'>4</div>
                  <div id='box_top_left'></div>
                  <div id='box_top_right'></div>
                  <div id='box_bot_left'></div>
                  <div id='box_bot_right'></div>
               </div>
            );
         default:
            return <i className='fa-solid fa-xmark red'></i>;
      }
   }
};

export default returnGrade;
