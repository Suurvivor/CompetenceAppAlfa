import React, { useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import { errorHandler } from '../../utils/requestErrorHandler';
import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   USER_LOADED,
   AUTH_ERROR,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT,
   GET_GROUPED_COMPETENCES_AUTH,
   GET_GROUPED_COMPETENCES_AUTH_ERROR,
   CLEAR_ERRORS,
} from '../types';

// Create a custom hook to use the auth context

export const useAuth = () => {
   const { state, dispatch } = useContext(AuthContext);
   return [state, dispatch];
};

// Action creators
// NOTE: These could be moved to a separate file like in redux
// but they remain here for ease of students transitioning

// Load User
export const loadUser = async (dispatch, load, cb) => {
   try {
      const res = await axios.get('/auth/me');
      //const planedTrain = await axios.get()
      //set load false
      if (load) load(false);
      dispatch({
         type: USER_LOADED,
         payload: res.data.user,
      });
   } catch (err) {
      errorHandler(err, dispatch, AUTH_ERROR);
   }
};

// Register User
export const register = async (dispatch, formData) => {
   try {
      const res = await axios.post('/auth/register', formData);
      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data.token,
      });

      setAuthToken(res.data.token);

      loadUser(dispatch);
   } catch (err) {
      errorHandler(err, dispatch, REGISTER_FAIL);
   }
};

// Login User
export const login = async (dispatch, formData) => {
   try {
      const res = await axios.post('/auth/login', formData);
      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data.token,
      });

      setAuthToken(res.data.token);

      loadUser(dispatch);
   } catch (err) {
      errorHandler(err, dispatch, LOGIN_FAIL);
   }
};

// Logout
export const logout = (dispatch) => {
   dispatch({ type: LOGOUT });
};

//get grouped competence
export const getGroupedCompetences = async (dispatch, user) => {
   try {
      const groups = await axios.get(`/groupcompetences/workplace/${user.workplace._id}`);
      dispatch({ type: GET_GROUPED_COMPETENCES_AUTH, payload: { groups, user } });
   } catch (err) {
      errorHandler(err, dispatch, GET_GROUPED_COMPETENCES_AUTH_ERROR);
   }
};

// Clear Errors
export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS });

// AuthState Provider Component

const AuthState = (props) => {
   const initialState = {
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      loading: true,
      user: null,
      competenceGroups: { groups: [], loading: true },
      error: null,
      blur: false,
   };

   const [state, dispatch] = useReducer(authReducer, initialState);

   // set token on initial app loading
   setAuthToken(state.token);

   //load user on first run or refresh
   if (state.loading) {
      loadUser(dispatch);
   }

   // 'watch' state.token and set headers and local storage on any change
   useEffect(() => {
      setAuthToken(state.token);
   }, [state.token]);

   return <AuthContext.Provider value={{ state: state, dispatch }}>{props.children}</AuthContext.Provider>;
};

export default AuthState;
