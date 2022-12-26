import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
   const alertContext = useContext(AlertContext);
   return (
      <div className='alert_container'>
         {alertContext.alerts.length > 0 &&
            alertContext.alerts.map((alert) => (
               <li className='alert' key={alert.id}>
                  <i className='fa-solid fa-triangle-exclamation'></i>
                  {alert.msg}
               </li>
            ))}
      </div>
   );
};

export default Alerts;
