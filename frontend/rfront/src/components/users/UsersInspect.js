import React, { useEffect } from 'react';

import Spinner from '../layout/Spinner';
import { useUsers, getUserCompetenceGroups } from '../../context/users/UsersState';
import UsersDashboard from './UsersDashboard';
import UsersCompetenceList from './UsersCompetenceList';

export const UsersInspect = ({ user }) => {
   const [usersState, usersDisptach] = useUsers();

   useEffect(() => {
      getUserCompetenceGroups(usersDisptach, user);
   }, []);
   if (!usersState.userCompetences) return <Spinner />;
   return (
      <>
         <UsersDashboard user={usersState.user} />
         <UsersCompetenceList usersState={usersState} />
      </>
   );
};

export default UsersInspect;
