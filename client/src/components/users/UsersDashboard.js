import React, { useEffect, useState } from 'react';
import { useBoxMidCard, setBoxMidCard, closeBoxMidCard } from '../../context/boxMidCard/BoxMidCardState';
import { useUsers, updateUser } from '../../context/users/UsersState';
import { User_dashboard_reminders_list } from '../user_page/User_dashboard_reminders_list';

const UsersDashboard = () => {
   const [usersState, usersDisptach] = useUsers();

   const [boxMidCardState, boxMidCardDispatch] = useBoxMidCard();
   const [editInput, setEditInput] = useState({
      user: { name: usersState.user.name },
      department: usersState.user?.workplace?.department
         ? usersState.user.workplace.department
         : usersState.departments[0],
      workplaces: usersState.user?.workplace?.department
         ? usersState.departments.find((depart) => depart._id === usersState.user.workplace.department._id).Workplaces
         : usersState.departments[0].Workplaces,
      selectedWorkplace: usersState.user?.workplace || usersState.departments[0].Workplaces[0],
   });
   const { user } = usersState;

   const onSave = () => {
      if (editInput.workplaces.length > 0) {
         updateUser(usersDisptach, {
            _id: usersState.user._id,
            name: editInput.user.name,
            workplace: { _id: editInput.selectedWorkplace._id, name: editInput.selectedWorkplace.name },
         });
      } else {
         updateUser(usersDisptach, {
            _id: usersState.user._id,
            name: editInput.user.name,
         });
      }
      closeBoxMidCard(boxMidCardDispatch);
   };

   const onChange = (e) => {
      if (
         usersState.departments.find((dep) => dep._id === e.target.options[e.target.selectedIndex].id).Workplaces
            .length > 0
      ) {
         setEditInput({
            ...editInput,
            department: usersState.departments.find((dep) => dep._id === e.target.options[e.target.selectedIndex].id),
            workplaces: usersState.departments.find((dep) => dep._id === e.target.options[e.target.selectedIndex].id)
               .Workplaces,
            selectedWorkplace: usersState.departments.find(
               (dep) => dep._id === e.target.options[e.target.selectedIndex].id
            ).Workplaces[0],
         });
      } else {
         setEditInput({
            ...editInput,
            department: usersState.departments.find((dep) => dep._id === e.target.options[e.target.selectedIndex].id),
            workplaces: usersState.departments.find((dep) => dep._id === e.target.options[e.target.selectedIndex].id)
               .Workplaces,
            selectedWorkplace: null,
         });
      }
   };

   const onWorkplaceChange = (e) => {
      //console.log(e.target.options[e.target.selectedIndex].);

      setEditInput({
         ...editInput,
         selectedWorkplace: {
            _id: e.target.options[e.target.selectedIndex].id,
            name: e.target.options[e.target.selectedIndex].value,
         },
      });
   };
   const editBody = () => {
      return (
         <div className='userInspect_edit_container'>
            <div>
               <label htmlFor='name'>Name:</label>
               <input
                  autoFocus
                  className='tree_dashboard_workplace_input'
                  type='text'
                  placeholder='name'
                  value={editInput.user.name}
                  onChange={(e) => setEditInput({ ...editInput, user: { name: e.target.value } })}
               />
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
                     if (department.Workplaces.length > 0) {
                        return (
                           <option id={department._id} key={department._id}>
                              {department.name}
                           </option>
                        );
                     } else {
                        return null;
                     }
                  })}
               </select>
            </div>
            {editInput.workplaces.length > 0 && (
               <div>
                  <label htmlFor='workplaces'>Choose Workplace:</label>
                  <select
                     className='tree_dashboard_workplace_select'
                     name='workplaces'
                     onChange={(e) => onWorkplaceChange(e)}
                     defaultValue={editInput.selectedWorkplace.name}
                  >
                     {editInput.workplaces.map((work) => (
                        <option key={work._id} id={work._id} value={work.name}>
                           {work.name}
                        </option>
                     ))}
                  </select>
               </div>
            )}

            <button className='login_view_button' onClick={onSave}>
               SAVE
            </button>
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
               className='fa-solid fa-user-tie cursor_pointer'
               id='user_dashborad_info_avatar'
               onClick={() => setBoxMidCard('Edit', editBody, boxMidCardDispatch)}
            ></i>
            <span id='user_dashboard_info_name'>{user.name}</span>
            <span id='user_dashboard_info_position'>
               Department: {user?.workplace?.department ? user.workplace.department.name : 'null'}
            </span>
            <span id='user_dashboard_info_department'>Workplace: {user?.workplace?.name || 'null'}</span>
         </div>
         <User_dashboard_reminders_list planedTraining={usersState.user.planedTraining} />
         <div id='user_dashboard_statistics'>to do</div>
      </div>
   );
};

export default UsersDashboard;
