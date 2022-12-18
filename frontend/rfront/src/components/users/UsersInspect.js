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
   }, []);
   if (!usersState.userCompetences) return <Spinner />;
   return (
      <>
         <UsersDashboard userState={usersState} />
         <UsersCompetenceList usersState={usersState} />
      </>
   );
};

export default UsersInspect;
