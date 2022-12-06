import React, { useState } from 'react';
import { useTree, updateCompetence } from '../../context/tree/TreeState';
const CompetenceListItem = ({ index, competence }) => {
   const [treeState, treeDispatch] = useTree();
   const [competenceForm, setCompetenceForm] = useState(competence);
   const [inputView, setInputView] = useState(false);
   const { name, ratingSetting } = competenceForm;

   const onErrorUpdate = () => {
      setCompetenceForm({ ...competenceForm, name: competence.name });
   };

   const onSave = () => {
      setInputView(false);
      updateCompetence(treeDispatch, competenceForm, onErrorUpdate);
   };

   const onChange = (e) => {
      if (e.target.name == 'ratingSetting') {
         setCompetenceForm({
            ...competenceForm,
            [e.target.name]: e.target.options[e.target.selectedIndex].value,
         });
      } else {
         setCompetenceForm({ ...competenceForm, [e.target.name]: e.target.value });
      }
   };
   return (
      <tr>
         <td>{index}</td>
         <td className='cursor_pointer'>
            {inputView ? (
               <div className='competence_list_group_item_container'>
                  <input
                     className='competence_list_group_item_input'
                     type='text'
                     name='name'
                     value={name}
                     onChange={onChange}
                  />
               </div>
            ) : (
               <p onClick={() => setInputView(true)}>{competence.name}</p>
            )}
         </td>
         <td>
            <select name='ratingSetting' defaultValue={ratingSetting} onChange={onChange}>
               <option value='from0to1'>0 - 1</option>
               <option value='from0to4'>0 - 4</option>
            </select>
         </td>
         <td>
            {inputView ? (
               <button className='competence_list_group_item_buttonSave' onClick={onSave}>
                  save
               </button>
            ) : (
               <i className='fa-solid fa-gears'></i>
            )}
         </td>
      </tr>
   );
};

export default CompetenceListItem;
