import React, { useState, useContext, useEffect } from 'react';
import {
   useTree,
   getWorkplaces,
   createDepartment,
   deleteDepartment,
   setCurrentDepartment,
} from '../../context/tree/TreeState';
import Spinner from '../layout/Spinner';

import { useBoxMidCard, setBoxMidCard } from '../../context/boxMidCard/BoxMidCardState';

const DepartmentList = () => {
   const [boxMidCardState, boxMidCardDispatch] = useBoxMidCard();
   const [treeState, treeDispatch] = useTree();
   const [showAdd, setShowAdd] = useState(false);
   const [departmentName, setDepartmentName] = useState(null);

   useEffect(() => {
      //console.log(treeState.departments[0]._id);
      if (treeState.departments.length > 0) onPick(treeState.departments[0]._id);
   }, []);
   // useEffect(() => {
   //    if (treeState.departments.length > 0) {
   //       console.log(treeState.currentDepartment);
   //       onPick(treeState.currentDepartment);
   //    }
   // }, [treeState.currentDepartment]);

   const onCreate = () => {
      createDepartment(treeDispatch, departmentName);
      setShowAdd(false);
      setDepartmentName(null);
   };

   const onPick = (departId) => {
      getWorkplaces(treeDispatch, departId);
      setCurrentDepartment(treeDispatch, departId);
   };

   let sure = (department) => {
      let accept = prompt(`Przepisz nazwe działu aby usunąc: ${department.name}`, 'nazwa dzialu');
      if (accept === department.name.toString()) {
         let index = treeState.departments.indexOf(department);
         deleteDepartment(treeDispatch, department._id);
         if (treeState.departments.length === 1) return; // if last one return
         onPick(treeState.departments[index - 1]._id); // select -1 from deleted one form list
      }
   };

   if (treeState.loading) return <Spinner />;
   return (
      <>
         <div className='treeWrapper'>
            <div id='treeDepartments'>
               <ul className='treeUlDepartments'>
                  {treeState.departments.map((department, index) => (
                     <div className='tree_dashboard_ul_item tree_dashboard_ul_item_active' key={department._id}>
                        <li
                           className={department._id === treeState.currentDepartment ? 'active' : ''}
                           key={department._id}
                           id={department._id}
                           onClick={(e) => onPick(e.target.id)}
                        >
                           {department.name}
                        </li>
                        <i className='fa-solid fa-circle-minus tree_delete_icon' onClick={() => sure(department)}></i>
                     </div>
                  ))}
               </ul>
               {showAdd && (
                  <>
                     <div className='tree_dashboard_ul_item tree_dashboard_ul_item_new'>
                        <input
                           type='text'
                           placeholder='Podaj nazwe działu'
                           className='tree_dashboard_ul_item_input'
                           onChange={(e) => setDepartmentName(e.target.value)}
                        />

                        <i className='fa-solid fa-xmark tree_delete_icon' onClick={() => setShowAdd(false)}></i>
                     </div>
                     <button className='tree_dashboard_ul_button' onClick={onCreate}>
                        Stwórz
                     </button>
                  </>
               )}
               {showAdd === false && (
                  <button onClick={() => setShowAdd(true)} className='tree_dashboard_ul_button'>
                     Stworz nowy dział
                  </button>
               )}
            </div>
         </div>
      </>
   );
};

export default DepartmentList;
