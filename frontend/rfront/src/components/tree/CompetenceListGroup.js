import React from 'react';
import CompetenceListGroupItem from './CompetenceListGroupItem';

const CompetenceListGroup = ({ group }) => {
   //console.log(group);
   return (
      <div className='item'>
         <table>
            <thead>
               <tr className='thead_menu'>
                  <th>
                     <i class='fa-solid fa-plus'></i>
                     <i class='fa-solid fa-file-pen'></i>
                     <i class='fa-solid fa-gear'></i>
                  </th>
               </tr>
               <tr>
                  <th>Id</th>
                  <th className='th_name'>{group.name}</th>
                  <th>Ocena</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               {group.competenceListId.map((competenceList, index) => (
                  <CompetenceListGroupItem key={index} index={index} competence={competenceList} />
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default CompetenceListGroup;
