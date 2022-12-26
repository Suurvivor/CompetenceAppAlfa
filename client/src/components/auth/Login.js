import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, clearErrors, login } from '../../context/auth/AuthState';
import AlertContext from '../../context/alert/alertContext';

export const Login = () => {
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
      email: '',
      password: '',
   });

   if (isAuthenticated) return <Navigate to='/' />;

   const { email, password } = user;

   const onChange = (e) =>
      setUser({ ...user, [e.target.name]: e.target.value });

   const onSubmit = (e) => {
      e.preventDefault();
      if (email === '' || password === '') {
         console.log('nie moga byc puste');
      } else {
         login(authDispatch, { email, password });
      }
   };

   return (
      <form id='login_view' onSubmit={onSubmit}>
         <p id='login_view_title'>Login to your Account</p>
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
         <div className='login_view_flex_row'>
            <a
               className='login_view_link'
               href='http://'
               target='_blank'
               rel='noopener noreferrer'
            >
               Forgot password
            </a>
            <button type='submit' className='login_view_button'>
               Log in
            </button>
         </div>
      </form>
   );
};
