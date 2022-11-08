import React, { useState } from 'react';
import { useTree, createGroup } from '../../context/tree/TreeState';

const CompetenceGroupAdd = ({ setShow }) => {
   const [treeState, treeDispatch] = useTree();
   const [groupName, setGroupName] = useState(null);
   const onClick = () => {
      createGroup(treeDispatch, treeState.competences[0].workplaceId, groupName);
      setShow(false);
   };
   const onChange = (value) => {
      setGroupName(value);
   };
   return (
      <div className='item'>
         <table>
            <thead>
               <tr>
                  <th className='th_name'>
                     <input type='text' placeholder='Podaj nazwe grupy' onChange={(e) => onChange(e.target.value)} />
                  </th>
                  <th>
                     <button className='th_name_button' onClick={onClick}>
                        Dodaj
                     </button>
                  </th>
               </tr>
            </thead>
         </table>
      </div>
   );
};

export default CompetenceGroupAdd;
