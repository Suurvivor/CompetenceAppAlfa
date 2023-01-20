import React, { useEffect } from 'react';

import Spinner from '../layout/Spinner';
import { useUsers, getUserCompetenceGroups, getDepartments, updateUser } from '../../context/users/UsersState';
import UsersDashboard from './UsersDashboard';
import UsersCompetenceList from './UsersCompetenceList';

export const UsersInspect = () => {
   const [usersState, usersDisptach] = useUsers();

   useEffect(() => {
      getDepartments(usersDisptach);
      getUserCompetenceGroups(usersDisptach, usersState.user);
   }, [usersState.user]);
   if (usersState.departments.length === 0) return <Spinner />;
   return (
      <>
         <UsersDashboard />
         <UsersCompetenceList usersState={usersState} />
      </>
   );
};

export default UsersInspect;
