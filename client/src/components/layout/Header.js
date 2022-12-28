import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../../context/auth/AuthState';

function Header() {
   const [authState, authDispatch] = useAuth();
   const { isAuthenticated } = authState;
   const onLogout = () => {
      logout(authDispatch);
   };

   return (
      <nav>
         <ul>
            <Link to='/'>Home</Link>

            {isAuthenticated ? (
               <>
                  <Link to='/calendar'>Calendar</Link>
                  <Link to='/users'>Users</Link>
                  <Link to='/tree'>Tree</Link>
                  <Link to='' onClick={onLogout}>
                     Logout
                  </Link>
               </>
            ) : (
               <>
                  <Link to='/login'>Login</Link>
                  <Link to='/register'>Register</Link>
               </>
            )}
         </ul>
      </nav>
   );
}

export default Header;
