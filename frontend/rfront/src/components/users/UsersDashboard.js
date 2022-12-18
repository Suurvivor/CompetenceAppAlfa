import React, { useEffect, useState } from 'react';
import { useBoxMidCard, setBoxMidCard, closeBoxMidCard } from '../../context/boxMidCard/BoxMidCardState';
import { useUsers, updateUser } from '../../context/users/UsersState';

const UsersDashboard = () => {
   const [usersState, usersDisptach] = useUsers();
   const [boxMidCardState, boxMidCardDispatch] = useBoxMidCard();
   const [editInput, setEditInput] = useState({
      user: { name: null },
      department: usersState.user.workplace.department,
      workplace: usersState.departments.find((depart) => depart._id === usersState.user.workplace.department._id)
         .Workplaces,
      selectedWorkplaceId: null,
   });
   const { user } = usersState;

   const onSave = () => {
      updateUser(usersDisptach, { name: editInput.user.name, workplace: editInput.workplace._id });
   };

   const onChange = (e) => {
      setEditInput({
         ...editInput,
         department: usersState.departments.find((dep) => dep._id === e.target.options[e.target.selectedIndex].id),
         workplace: usersState.departments.find((dep) => dep._id === e.target.options[e.target.selectedIndex].id)
            .Workplaces,
      });
   };

   const onWorkplaceChange = (e) => {
      setEditInput({ ...editInput, selectedWorkplaceId: e.target.options[e.target.selectedIndex].id });
   };
   const editBody = () => {
      return (
         <div className='userInspect_edit_container'>
            <div>
               <label htmlFor='name'>Name:</label>
               <input className='tree_dashboard_workplace_input' type='text' placeholder='name' />
            </div>
            <div>
               <label htmlFor='departments'>Choose Department:</label>

               <select
                  defaultValue={editInput.department.name}
                  className='tree_dashboard_workplace_select'
                  name='departments'
                  onChange={(e) => onChange(e)}
               >
                  {usersState.departments.map((department) => {
                     if (department._id === usersState.user.workplace.department._id) {
                        return (
                           <option id={department._id} key={department._id}>
                              {department.name}
                           </option>
                        );
                     } else {
                        return (
                           <option id={department._id} key={department._id}>
                              {department.name}
                           </option>
                        );
                     }
                  })}
               </select>
            </div>
            <div>
               <label htmlFor='workplaces'>Choose Workplace:</label>

               <select
                  className='tree_dashboard_workplace_select'
                  name='workplaces'
                  onChange={(e) => onWorkplaceChange(e)}
                  defaultValue={editInput.selectedWorkplaceId}
               >
                  {editInput.workplace.map((work) => (
                     <option key={work._id} id={work._id}>
                        {work.name}
                     </option>
                  ))}
               </select>
            </div>
            <button className='login_view_button'>SAVE</button>
         </div>
      );
   };

   useEffect(() => {
      if (boxMidCardState.show) setBoxMidCard('Edit', editBody, boxMidCardDispatch);
   }, [editInput]);

   return (
      <div id='user_dashboard'>
         <div id='user_dashboard_info'>
            <i
               className='fa-solid fa-user-tie'
               id='user_dashborad_info_avatar'
               onClick={() => setBoxMidCard('Edit', editBody, boxMidCardDispatch)}
            ></i>
            <span id='user_dashboard_info_name'>{user.name}</span>
            <span id='user_dashboard_info_position'>Department: {user.workplace.department.name}</span>
            <span id='user_dashboard_info_department'>Workplace: {user.workplace.name}</span>
         </div>
         <div id='user_dashboard_statistics'>to do</div>
      </div>
   );
};

export default UsersDashboard;
