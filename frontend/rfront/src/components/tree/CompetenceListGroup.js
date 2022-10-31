import React from 'react';
import CompetenceListGroupItem from './CompetenceListGroupItem';

const CompetenceListGroup = ({ group }) => {
   return (
      <div className='item'>
         <table>
            <thead>
               <tr>
                  <th>Id</th>
                  <th>{group.name}</th>
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
