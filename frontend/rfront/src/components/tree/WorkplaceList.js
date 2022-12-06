import React, { useEffect, useState } from 'react';
import {
   useTree,
   getCompetences,
   setCurrentWorkplace,
   createWorkplace,
   deleteWorkplace,
} from '../../context/tree/TreeState';

import Spinner from '../layout/Spinner';

const WorkplaceList = () => {
   const [treeState, treeDispatch] = useTree();
   const [showAdd, setShowAdd] = useState(false);
   const [workplaceName, setWorkplaceName] = useState(false);
   const [selectedWorkplace, setSelectedWorkplace] = useState(null);

   useEffect(() => {
      if (treeState.workplaces.length > 0) {
         setCurrentWorkplace(treeDispatch, treeState.workplaces[0]._id);
         getCompetences(treeDispatch, treeState.workplaces[0]._id);
      }
   }, [treeState.workplaces]);

   const onChange = (id) => {
      getCompetences(treeDispatch, id);
      setCurrentWorkplace(treeDispatch, id);
   };

   const onCreate = () => {
      setShowAdd(false);
      createWorkplace(treeDispatch, treeState.currentDepartment, workplaceName);
   };

   if (treeState.loading) return <Spinner />;

   return (
      <div className='tree_workplace_list'>
         {treeState.workplaces.length > !-1 && (
            <>
               <label htmlFor='workplaces'>Choose Workplace:</label>

               <select
                  className='tree_dashboard_workplace_select'
                  name='workplaces'
                  onChange={(e) => onChange(e.target.options[e.target.selectedIndex].id)}
               >
                  {treeState.workplaces.map((workplace, index) => (
                     <option id={workplace._id} key={index} value={workplace.name}>
                        {workplace.name}
                     </option>
                  ))}
               </select>
            </>
         )}

         {showAdd && (
            <>
               <i
                  className='fa-solid fa-xmark tree_dashboard_workplace_close_icon'
                  onClick={() => setShowAdd(false)}
               ></i>
               <input
                  type='text'
                  placeholder='Podaj nazwe stanowiska pracy'
                  onChange={(e) => setWorkplaceName(e.target.value)}
                  className='tree_dashboard_workplace_input'
               />
               <button onClick={onCreate} className='tree_dashboard_ul_button'>
                  Stwórz
               </button>
            </>
         )}
         {!showAdd && (
            <>
               <button onClick={() => setShowAdd(true)} className='tree_dashboard_ul_button'>
                  Stworz nowe stanowisko pracy
               </button>
               {treeState.workplaces.length > !-1 && (
                  <button
                     onClick={() => deleteWorkplace(treeDispatch, treeState.currentWorkplace)}
                     className='tree_dashboard_ul_button'
                  >
                     Usuń {treeState.currentWorkplace}
                  </button>
               )}
            </>
         )}
      </div>
   );
};

export default WorkplaceList;
