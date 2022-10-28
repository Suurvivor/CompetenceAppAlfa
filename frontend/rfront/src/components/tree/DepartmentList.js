import React, { useState, useContext, useEffect } from 'react';
import { useTree, getWorkplaces } from '../../context/tree/TreeState';
import Spinner from '../layout/Spinner';

const DepartmentList = () => {
   const [treeState, treeDispatch] = useTree();

   if (treeState.loading) return <Spinner />;
   return (
      <>
         <div className='treeWrapper'>
            <div id='treeDepartments'>
               <ul className='treeUlDepartments'>
                  {treeState.departments.map((department, index) => (
                     <li
                        key={department._id}
                        id={department._id}
                        onClick={(e) =>
                           getWorkplaces(treeDispatch, e.target.id)
                        }
                     >
                        {department.name}
                     </li>
                  ))}
                  {}
               </ul>
            </div>
         </div>
      </>
   );
};

export default DepartmentList;
