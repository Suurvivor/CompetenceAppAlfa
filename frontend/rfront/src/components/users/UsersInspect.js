import React, { useEffect } from 'react';

import Spinner from '../layout/Spinner';
import { useUsers, getUserCompetenceGroups, getDepartments, updateUser } from '../../context/users/UsersState';
import UsersDashboard from './UsersDashboard';
import UsersCompetenceList from './UsersCompetenceList';

export const UsersInspect = ({ user }) => {
   const [usersState, usersDisptach] = useUsers();

   useEffect(() => {
      getDepartments(usersDisptach);
      getUserCompetenceGroups(usersDisptach, user);
   }, [usersState.user]);
   if (!usersState.userCompetences || !usersState.departments) return <Spinner />;
   return (
      <>
         <UsersDashboard />
         <UsersCompetenceList usersState={usersState} />
      </>
   );
};

export default UsersInspect;
