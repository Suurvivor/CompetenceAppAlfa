import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UsersList from './UsersList';
import UsersSearchInput from './UsersSearchInput';
import UsersInspect from './UsersInspect';
import { useUsers, getUser, getUsers, clearUser } from '../../context/users/UsersState';

const divEnd = (string) => {
   let backup = Array.from(string);

   let trueDivCount = 0;

   const output = Array.from(string).forEach((char, index, str) => {
      if (char === '<') {
         let divCase = '<div>';
         let isTrueDiv = false;

         for (let i = 0; str[index + i] === divCase[i]; i++) {
            console.log(i);
            if (i === 4) {
               isTrueDiv = true;
               trueDivCount += 1;
               i = 0;
               if (trueDivCount === 2) {
                  trueDivCount = 0;
                  backup.splice(index + 1, 0, '/');
                  console.log(backup);
               }
            } else {
               isTrueDiv = false;
            }
         }
      }
   });
};

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

   if (usersState.user) {
      return (
         <>
            <i className='fa-solid fa-chevron-left fa-2x cursor_pointer' onClick={() => clearUser(usersDispatch)}>
               back
            </i>
            <UsersInspect />
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
