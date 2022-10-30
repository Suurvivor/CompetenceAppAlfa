import React from 'react';
import { useTree, getCompetences } from '../../context/tree/TreeState';
import Spinner from '../layout/Spinner';
const WorkplaceList = () => {
   const [treeState, treeDispatch] = useTree();

   if (treeState.loading) return <Spinner />;
   if (treeState.workplaces) {
      getCompetences(treeDispatch, treeState.workplaces[0]._id);
      return (
         <>
            <label htmlFor='workplaces'>Choose Workplace:</label>

            <select
               name='workplaces'
               onChange={(e) => {
                  getCompetences(
                     treeDispatch,
                     e.target.options[e.target.selectedIndex].id
                  );
               }}
            >
               {treeState.workplaces.map((workplace, index) => (
                  <option id={workplace._id} key={index} value={workplace.name}>
                     {workplace.name}
                  </option>
               ))}
            </select>
         </>
      );
   }
};

export default WorkplaceList;
