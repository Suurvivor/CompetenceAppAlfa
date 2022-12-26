import React from 'react';

const UsersSearchInput = ({ setSearchInput }) => {
   return (
      <div className='users_search_container'>
         <input
            onChange={(e) => {
               setSearchInput(e.target.value);
            }}
            className='users_search_input'
            type='text'
            name='users_search_input'
            placeholder='Search for users'
         />
         <i className='fa-solid fa-magnifying-glass user_search_input_icon'></i>
      </div>
   );
};

export default UsersSearchInput;
