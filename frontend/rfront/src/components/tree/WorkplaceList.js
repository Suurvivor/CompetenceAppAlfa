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
   if (treeState.workplaces.length > 0) {
      return (
         <div className='tree_workplace_list'>
            <label htmlFor='workplaces'>Choose Workplace:</label>

            <select name='workplaces' onChange={(e) => onChange(e.target.options[e.target.selectedIndex].id)}>
               {treeState.workplaces.map((workplace, index) => (
                  <option id={workplace._id} key={index} value={workplace.name}>
                     {workplace.name}
                  </option>
               ))}
            </select>
            {showAdd && (
               <>
                  <input
                     type='text'
                     placeholder='Podaj nazwe stanowiska pracy'
                     onChange={(e) => setWorkplaceName(e.target.value)}
                  />
                  <button onClick={onCreate}>Stwórz</button>
               </>
            )}
            {!showAdd && (
               <>
                  <button onClick={() => setShowAdd(true)}>Stworz nowe stanowisko pracy</button>{' '}
                  <button onClick={() => deleteWorkplace(treeDispatch, treeState.currentWorkplace)}>
                     Usuń wybrane stanowisko pracy z listy
                  </button>
               </>
            )}
         </div>
      );
   } else {
      return (
         <div className='tree_workplace_list'>
            {showAdd && (
               <>
                  <input
                     type='text'
                     placeholder='Podaj nazwe stanowiska pracy'
                     onChange={(e) => setWorkplaceName(e.target.value)}
                  />
                  <button onClick={onCreate}>Stwórz</button>
               </>
            )}
            {!showAdd && (
               <>
                  <button onClick={() => setShowAdd(true)}>Stworz nowe stanowisko pracy</button>{' '}
                  <button onClick={() => deleteWorkplace(treeDispatch, treeState.currentWorkplace)}>
                     Usuń wybrane stanowisko pracy z listy
                  </button>
               </>
            )}
         </div>
      );
   }
};

export default WorkplaceList;
