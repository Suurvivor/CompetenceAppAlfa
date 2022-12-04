import React, { useEffect } from 'react';

import { useBoxMidCard, closeBoxMidCard } from '../../context/boxMidCard/BoxMidCardState';

const BoxMidCard = () => {
   const [boxMidCardState, boxMidCardDispatch] = useBoxMidCard();
   const { show, title } = boxMidCardState;
   if (show) {
      return (
         <>
            <div className='boxMidCard'>
               <div className='boxMidCard_topBar'>
                  {title && <p className='boxMidCard_topBarTitle'>{title}</p>}
                  <i
                     className='fa-solid fa-x boxMidCard_topBarIcon'
                     onClick={() => closeBoxMidCard(boxMidCardDispatch)}
                  ></i>
               </div>
               <boxMidCardState.body />
            </div>

            <div className='blur' onClick={() => closeBoxMidCard(boxMidCardDispatch)}></div>
         </>
      );
   }
};

export default BoxMidCard;
