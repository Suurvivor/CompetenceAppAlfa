import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth/AuthState';

const getDepartments = async (state) => {
   const res = await axios.get('/departments');
   console.log(res.data.data);
};

function Departments() {
   const [authState] = useAuth();
   const [departments, setDepartments] = useState([]);
   useEffect(() => {
      setDepartments(getDepartments());
   }, []);

   return <div>Departments</div>;
}

export default Departments;
