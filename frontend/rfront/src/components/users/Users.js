import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UsersList from './UsersList';
import UsersSearchInput from './UsersSearchInput';
import UsersInspect from './UsersInspect';

const Users = () => {
   const [users, setUsers] = useState(null);
   const [searchInput, setSearchInput] = useState('');
   const [user, setUser] = useState();
   const { userId } = useParams();

   useEffect(() => {
      if (userId) {
         getUser(userId);
      } else {
         getUsers();
      }
   }, [searchInput, userId]);

   const getUser = async (userId) => {
      const req = await axios.get(`users/${userId}`);
      setUser(req.data.data);
   };

   const getUsers = async () => {
      const req = await axios.get(`users/?s=${searchInput}`);
      const dataUsers = req.data.data.map((user) =>
         user.name.toString().length >= 10
            ? { ...user, shortName: `${user.name.slice(0, 10)}..` }
            : { ...user, shortName: user.name }
      );
      setUsers(dataUsers);
   };

   if (user) {
      return <UsersInspect user={user} />;
   } else {
      return (
         <div className='users'>
            <p className='users_title'>Users</p>
            <UsersSearchInput setSearchInput={setSearchInput} />
            <UsersList users={users} setUser={setUser} />
         </div>
      );
   }
};

export default Users;
