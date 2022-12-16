import React from 'react';
import UsersListItem from './UsersListItem';
import Spinner from '../layout/Spinner';
import { v4 as uuidv4 } from 'uuid';

const UsersList = ({ users, setUser }) => {
   if (!users) return <Spinner />;
   return (
      <div className='users_list_container'>
         {users.map((user) => {
            return <UsersListItem user={user} key={uuidv4()} setUser={setUser} />;
         })}
      </div>
   );
};

export default UsersList;
