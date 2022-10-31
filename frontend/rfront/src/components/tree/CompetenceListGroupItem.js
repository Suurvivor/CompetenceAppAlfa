import React, { useEffect, useState } from 'react';
import { useTree, updateCompetence } from '../../context/tree/TreeState';
const CompetenceListItem = ({ index, competence }) => {
   const [treeState, treeDispatch] = useTree();
   const [competenceForm, setCompetenceForm] = useState(competence);
   const { name, ratingSetting } = competenceForm;

   useEffect(() => {
      updateCompetence(treeDispatch, competenceForm);
      console.log(competenceForm);
   }, [competenceForm]);

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
         <td>
            <input type='text' name='name' value={name} onChange={onChange} />
         </td>
         <td>
            <select name='ratingSetting' defaultValue={ratingSetting} onChange={onChange}>
               <option value='from0to1'>0 - 1</option>
               <option value='from0to4'>0 - 4</option>
            </select>
         </td>
         <td>
            <i className='fa-solid fa-gears'></i>
         </td>
      </tr>
   );
};

export default CompetenceListItem;
