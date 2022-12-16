import React from 'react';
import UsersListItem from './UsersListItem';
import Spinner from '../layout/Spinner';
import { v4 as uuidv4 } from 'uuid';

const UsersList = ({ users }) => {
   if (!users) return <Spinner />;
   return (
      <div className='users_list_container'>
         {users.map((user) => {
            return <UsersListItem user={user} key={uuidv4()} />;
         })}
      </div>
   );
};

export default UsersList;
