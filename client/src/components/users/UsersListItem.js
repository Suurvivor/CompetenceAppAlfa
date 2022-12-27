import React from 'react';
import { useUsers, getUser } from '../../context/users/UsersState';

const UsersListItem = ({ user }) => {
   const [usersState, usersDispatch] = useUsers();
   return (
      <div className='users_list_item' onClick={() => getUser(usersDispatch, user._id)}>
         <i className='fa-solid fa-user-tie users_list_item_icon'></i>
         <span className='users_list_item_name'>{user.shortName}</span>
         <span className='users_list_item_position'>{user?.workplace?.name}</span>
         <button className='users_list_item_button'>more info</button>
      </div>
   );
};

export default UsersListItem;
