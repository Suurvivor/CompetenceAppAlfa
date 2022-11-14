import React, { useEffect, useState } from 'react';
import CompetenceListGroupItem from './CompetenceListGroupItem';
import { useTree, addCompetenceAndAddToGroup, updateGroup } from '../../context/tree/TreeState';

const CompetenceListGroup = ({ group }) => {
   const [treeState, treeDispatch] = useTree();
   const [show, setShow] = useState(false);
   const [newComp, setNewComp] = useState({ name: null, ratingSetting: 'from0to1' });
   const [grName, setGrName] = useState(group.name || null);

   useEffect(() => {
      updateGroup(treeDispatch, grName, group._id);
   }, [grName]);

   const onChange = (e) => {
      if (e.target.name == 'ratingSetting') {
         setNewComp({
            ...newComp,
            [e.target.name]: e.target.options[e.target.selectedIndex].value,
         });
      } else {
         setNewComp({ ...newComp, [e.target.name]: e.target.value });
      }
   };

   const onAdd = () => {
      addCompetenceAndAddToGroup(treeDispatch, newComp, group._id, group.workplaceId);
      setNewComp({ name: null, ratingSetting: 'from0to1' });
      setShow(false);
   };

   return (
      <div className='item'>
         <table>
            <thead>
               <tr className='thead_menu'>
                  <th>
                     <i className='fa-solid fa-plus' onClick={() => setShow(true)}></i>
                     <i className='fa-solid fa-file-pen'></i>
                     <i className='fa-solid fa-gear'></i>
                  </th>
               </tr>
               <tr>
                  <th>Id</th>
                  <th className='th_name'>
                     <input
                        type='text'
                        value={grName}
                        onChange={(e) => setGrName(e.target.value)}
                        onBlur={() => updateGroup(treeDispatch, grName, group._id)}
                     />
                  </th>
                  <th>Ocena</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               {group.competenceListId.map((competenceList, index) => (
                  <CompetenceListGroupItem key={competenceList._id} index={index} competence={competenceList} />
               ))}
               {show && (
                  <tr>
                     <td>New</td>
                     <td>
                        <input type='text' name='name' placeholder='Provide competence name' onChange={onChange} />
                     </td>
                     <td>
                        <select name='ratingSetting' defaultValue='from0to1' onChange={onChange}>
                           <option value='from0to1'>0 - 1</option>
                           <option value='from0to4'>0 - 4</option>
                        </select>
                     </td>
                     <td>
                        <button onClick={onAdd}>Dodaj</button>
                     </td>
                     <i className='fa-solid fa-xmark' onClick={() => setShow(false)}></i>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   );
};

export default CompetenceListGroup;
