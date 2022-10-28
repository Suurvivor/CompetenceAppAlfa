import React from 'react';
import { useTree } from '../../context/tree/TreeState';
import Spinner from '../layout/Spinner';
const WorkplaceList = () => {
   const [treeState, treeDispatch] = useTree();

   if (treeState.loading) return <Spinner />;
   if (treeState.workplaces)
      return (
         <>
            <label htmlFor='cars'>Choose Workplace:</label>

            <select name='cars' id='cars'>
               {treeState.workplaces.map((workplace, index) => (
                  <option key={index} value={workplace.name}>
                     {workplace.name}
                  </option>
               ))}
            </select>
         </>
      );
};

export default WorkplaceList;
