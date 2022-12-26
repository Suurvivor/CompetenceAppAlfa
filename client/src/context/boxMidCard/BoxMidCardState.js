import React, { useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import boxMidCardContext from './boxMidCardContext';
import boxMidCardReducer from './boxMidCardReducer';
import { errorHandler } from '../../utils/requestErrorHandler';
import { SET_BOX_MID_CARD, CLOSE_BOX_MID_CARD } from '../types';

// Create a custom hook to use the auth context

export const useBoxMidCard = () => {
   const { state, dispatch } = useContext(boxMidCardContext);
   return [state, dispatch];
};

// Action creators
// NOTE: These could be moved to a separate file like in redux
// but they remain here for ease of students transitioning

// Load User
// export const loadUser = async (dispatch) => {
//    try {
//       const res = await axios.get('/auth/me');

//       dispatch({
//          type: USER_LOADED,
//          payload: res.data.user,
//       });
//    } catch (err) {
//      // errorHandler(err, dispatch, AUTH_ERROR);
//    }
// };

export const setBoxMidCard = (title, body, dispatch) => {
   dispatch({ type: SET_BOX_MID_CARD, payload: { title, body } });
};

export const closeBoxMidCard = (dispatch) => {
   dispatch({ type: CLOSE_BOX_MID_CARD });
};

const BoxMidCardState = (props) => {
   const initialState = {
      show: false,
      title: 'Box Mid Card',
      Body: null,
   };

   const [state, dispatch] = useReducer(boxMidCardReducer, initialState);

   return <boxMidCardContext.Provider value={{ state: state, dispatch }}>{props.children}</boxMidCardContext.Provider>;
};

export default BoxMidCardState;
