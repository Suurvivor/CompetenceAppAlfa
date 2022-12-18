import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UsersList from './UsersList';
import UsersSearchInput from './UsersSearchInput';
import UsersInspect from './UsersInspect';
import { useUsers, getUser, getUsers, clearUser } from '../../context/users/UsersState';

const Users = () => {
   const [usersState, usersDispatch] = useUsers();
   const [searchInput, setSearchInput] = useState('');
   const { userId } = useParams();

   useEffect(() => {
      if (userId) {
         getUser(usersDispatch, userId);
      } else {
         getUsers(usersDispatch, searchInput);
      }
   }, [searchInput, userId]);

   if (usersState.user && usersState.user.workplace && usersState.user.workplace.department) {
      return (
         <>
            <i className='fa-solid fa-chevron-left fa-2x cursor_pointer' onClick={() => clearUser(usersDispatch)}>
               back
            </i>
            <UsersInspect user={usersState.user} />
         </>
      );
   } else {
      return (
         <div className='users'>
            <p className='users_title'>Users</p>
            <UsersSearchInput setSearchInput={setSearchInput} />
            <UsersList users={usersState.users} />
         </div>
      );
   }
};

export default Users;
