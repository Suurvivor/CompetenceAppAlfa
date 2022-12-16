import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsersList from './UsersList';
import UsersSearchInput from './UsersSearchInput';

const Users = () => {
   const [users, setUsers] = useState(null);
   const [searchInput, setSearchInput] = useState('');

   useEffect(() => {
      getUsers();
   }, [searchInput]);

   const getUsers = async () => {
      const req = await axios.get(`users/?s=${searchInput}`);
      const dataUsers = req.data.data.map((user) =>
         user.name.toString().length >= 10
            ? { ...user, shortName: `${user.name.slice(0, 10)}..` }
            : { ...user, shortName: user.name }
      );
      setUsers(dataUsers);
   };

   return (
      <div className='users'>
         <p className='users_title'>Users</p>
         <UsersSearchInput setSearchInput={setSearchInput} />
         <UsersList users={users} />
      </div>
   );
};

export default Users;
