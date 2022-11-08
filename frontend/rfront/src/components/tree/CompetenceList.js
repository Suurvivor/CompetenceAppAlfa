import React, { useEffect, useState } from 'react';
import CompetenceListGroup from './CompetenceListGroup';
import { useTree } from '../../context/tree/TreeState';
import ItemEmpty from './ItemEmpty';
import CompetenceGroupEmpty from './CompetenceGroupAdd';

const CompetenceList = () => {
   const [treeState, treeDispatch] = useTree();
   const [showAddGroup, setShowAddGroup] = useState(false);

   if (treeState.competences)
      return (
         <div id='container'>
            <div className='flex-row'>
               <div className='flex-column'>
                  {treeState.competences.map((competence, index) => {
                     if (index < treeState.competences.length / 2) {
                        return <CompetenceListGroup key={index} group={competence} />;
                     }
                  })}
                  {treeState.competences.length === 1 &&
                     (showAddGroup ? (
                        <CompetenceGroupEmpty setShow={setShowAddGroup} />
                     ) : (
                        <ItemEmpty setShow={setShowAddGroup} />
                     ))}
               </div>
               <div className='flex-column'>
                  {treeState.competences.map((competence, index) => {
                     if (index >= treeState.competences.length / 2) {
                        return <CompetenceListGroup key={index + 1000} group={competence} />;
                     }
                  })}
                  {treeState.competences.length !== 0 &&
                     (showAddGroup ? (
                        <CompetenceGroupEmpty setShow={setShowAddGroup} />
                     ) : (
                        <ItemEmpty setShow={setShowAddGroup} />
                     ))}
               </div>
            </div>
         </div>
      );
};

export default CompetenceList;
