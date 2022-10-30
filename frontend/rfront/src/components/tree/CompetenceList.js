import React, { useEffect } from 'react';
import CompetenceListGroup from './CompetenceListGroup';
import { useTree } from '../../context/tree/TreeState';

const CompetenceList = () => {
   const [treeState, treeDispatch] = useTree();
   if (treeState.competences)
      return (
         <div id='container'>
            <div className='flex-row'>
               <div className='flex-column'>
                  <CompetenceListGroup />
                  <div className='item item-empty'>
                     <i className='fa-solid fa-plus fa-4x'></i>
                     <p>Dodaj nową grupe kompetencji</p>
                  </div>
               </div>
               <div className='flex-column'>
                  <CompetenceListGroup />
                  <div className='item item-empty'>
                     <i className='fa-solid fa-plus fa-4x'></i>
                     <p>Dodaj nową grupe kompetencji</p>
                  </div>
               </div>
            </div>
         </div>
      );
};

export default CompetenceList;
