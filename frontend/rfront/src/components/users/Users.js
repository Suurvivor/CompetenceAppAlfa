import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
   const getUsers = async () => {
      const req = await axios.get('users/?s=kevc&&select=name&&page=2');
      console.log(req);
   };
   getUsers();

   const nowafunc = () => {
      let re = new RegExp(`hello`);
      console.log(re);
   };
   nowafunc();

   return (
      <div className='users'>
         <p className='users_title'>Users</p>
         <div className='users_search_container'>
            <input
               className='users_search_input'
               type='text'
               name='users_search_input'
               placeholder='Search for users'
            />
            <i className='fa-solid fa-magnifying-glass user_search_input_icon'></i>
         </div>
      </div>
   );
};

export default Users;
