import React, { useEffect, useState } from 'react';
import CompetenceListGroup from './CompetenceListGroup';
import { useTree, getCompetences } from '../../context/tree/TreeState';
import ItemEmpty from './ItemEmpty';
import CompetenceGroupEmpty from './CompetenceGroupAdd';

const CompetenceList = () => {
   const [treeState, treeDispatch] = useTree();
   const [showAddGroup, setShowAddGroup] = useState(false);

   if (treeState.competences && treeState.workplaces.length > 0) {
      return (
         <div id='container'>
            <div className='flex-row'>
               <div className='flex-column'>
                  {treeState.competences.length <= 0 && !showAddGroup && <ItemEmpty setShow={setShowAddGroup} />}
                  {treeState.competences.length <= 0 && showAddGroup && (
                     <CompetenceGroupEmpty setShow={setShowAddGroup} />
                  )}
                  {treeState.competences.map((competence, index) => {
                     if (index < treeState.competences.length / 2) {
                        return <CompetenceListGroup key={competence._id} group={competence} />;
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
                        return <CompetenceListGroup key={competence._id} group={competence} />;
                     }
                  })}
                  {treeState.competences.length !== 0 &&
                     treeState.competences.length !== 1 &&
                     (showAddGroup ? (
                        <CompetenceGroupEmpty setShow={setShowAddGroup} />
                     ) : (
                        <ItemEmpty setShow={setShowAddGroup} />
                     ))}
               </div>
            </div>
         </div>
      );
   }
};

export default CompetenceList;
