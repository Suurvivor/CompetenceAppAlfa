import React from 'react';
import { useTree } from '../../context/tree/TreeState';
import Spinner from '../layout/Spinner';
const WorkplaceList = () => {
   const [treeState, treeDispatch] = useTree();

   if (treeState.loading) return <Spinner />;
   return <div>WorkplaceList</div>;
};

export default WorkplaceList;
