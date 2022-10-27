import { NETWORK_ERROR, ERROR } from '../context/types';
export const errorHandler = (err, dispatch, Type) => {
   if (err && err.code === 'ERR_NETWORK') {
      dispatch({
         type: NETWORK_ERROR,
         payload: 'Server error try later',
      });
   } else if (
      err &&
      err.code === 'ERR_BAD_REQUEST' &&
      !err.response.hasOwnProperty('data')
   ) {
      console.log(err);
      dispatch({
         type: NETWORK_ERROR,
         payload: 'ERR_BAD_REQUEST',
      });
   } else if (err) {
      dispatch({
         type: Type,
         payload: err.response.data.error,
      });
   }
};
