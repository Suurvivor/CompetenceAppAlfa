import React from 'react';

const UsersListItem = (props) => {
   let user = { ...props.user };
   return (
      <div className='users_list_item'>
         <i className='fa-solid fa-user-tie users_list_item_icon'></i>
         <span className='users_list_item_name'>{user.shortName}</span>
         <span className='users_list_item_position'>Ustawiacz</span>
         <button className='users_list_item_button'>more info</button>
      </div>
   );
};

export default UsersListItem;
