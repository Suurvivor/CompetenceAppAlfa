import React, { useState, useContext, useEffect } from 'react';
import { useTree, getDepartments } from '../../context/tree/TreeState';
import Spinner from '../layout/Spinner';

const DepartmentList = () => {
   const [treeState, treeDispatch] = useTree();

   useEffect(() => {
      getDepartments(treeDispatch);
   }, []);
   if (treeState.loading) return <Spinner />;
   return (
      <>
         <div className='treeWrapper'>
            <div id='treeDepartments'>
               <ul className='treeUlDepartments'>
                  {treeState.departments.map((department, index) => (
                     <li key={index}>{department.name}</li>
                  ))}
                  {}
               </ul>
            </div>
         </div>
      </>
   );
};

export default DepartmentList;
