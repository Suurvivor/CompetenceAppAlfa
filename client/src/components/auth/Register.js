import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, clearErrors, register } from '../../context/auth/AuthState';
import AlertContext from '../../context/alert/alertContext';

export const Register = () => {
   const alertContext = useContext(AlertContext);
   const { setAlert } = alertContext;
   const [authState, authDispatch] = useAuth();
   const { error, isAuthenticated } = authState;

   useEffect(() => {
      if (error) {
         setAlert(error, 'danger');
         clearErrors(authDispatch);
      }
   }, [error]);

   const [user, setUser] = useState({
      name: '',
      email: '',
      password: '',
      password2: '',
   });

   const { name, email, password, password2 } = user;

   const onChange = (e) =>
      setUser({ ...user, [e.target.name]: e.target.value });

   const onSubmit = (e) => {
      e.preventDefault();
      if (name === '' || email === '' || password === '' || password2 === '') {
         console.log('');
      } else {
         register(authDispatch, { name, email, password });
      }
   };

   if (isAuthenticated) return <Navigate to='/' />;

   return (
      <form id='login_view' onSubmit={onSubmit}>
         <p id='login_view_title'>Register new Account</p>
         <input
            className='login_input_text'
            type='text'
            name='name'
            id='name'
            placeholder='name'
            value={name}
            onChange={onChange}
         />
         <input
            className='login_input_text'
            type='email'
            name='email'
            id='email'
            placeholder='email'
            value={email}
            onChange={onChange}
         />
         <input
            className='login_input_text'
            type='password'
            name='password'
            placeholder='passowrd'
            value={password}
            onChange={onChange}
         />
         <input
            className='login_input_text'
            type='password'
            name='password2'
            placeholder='repeat passowrd'
            value={password2}
            onChange={onChange}
         />
         <div className='login_view_flex_row'>
            <div id='login_view_terms_container'>
               <input type='checkbox' name='terms' id='terms' />
               <span className='login_view_link'>Terms of use</span>
            </div>

            <button className='login_view_button' type='submit'>
               REGISTER
            </button>
         </div>
      </form>
   );
};
