import React, { useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import UsersContext from './usersContext';
import usersReducer from './usersReducer';
import AlertContext from '../alert/alertContext';
import { errorHandler } from '../../utils/requestErrorHandler';
import {
   CLEAR_ERRORS,
   USERS_GET_USER,
   USERS_GET_USERS,
   USERS_CLEAR_USER,
   USERS_GET_COMPETENCE_GROUPS,
   USERS_SET_USER,
   USERS_LOAD_FAIL,
   USERS_GET_DEPARTMENTS,
   USERS_UPDATE_USER,
   USERS_ADD_RATING,
} from '../types';

// Create a custom hook to use the auth context

export const useUsers = () => {
   const { state, dispatch } = useContext(UsersContext);
   return [state, dispatch];
};

export const getUser = async (dispatch, userId) => {
   try {
      const req = await axios.get(`users/${userId}`);
      dispatch({ type: USERS_GET_USER, payload: req.data.data });
   } catch (error) {
      errorHandler(error, dispatch, USERS_LOAD_FAIL);
   }
};

export const getUsers = async (dispatch, searchInput) => {
   try {
      const req = await axios.get(`users/?s=${searchInput}`);
      dispatch({ type: USERS_GET_USERS, payload: req.data.data });
   } catch (error) {
      errorHandler(error, dispatch, USERS_LOAD_FAIL);
   }
};

export const setUser = (dispatch, user) => {
   dispatch({ type: USERS_SET_USER, payload: user });
};

export const getUserCompetenceGroups = async (dispatch, user) => {
   try {
      const groups = await axios.get(`/groupcompetences/workplace/${user.workplace._id}`);
      dispatch({ type: USERS_GET_COMPETENCE_GROUPS, payload: { groups: groups.data.data, user } });
   } catch (error) {
      errorHandler(error, dispatch, USERS_LOAD_FAIL);
   }
};

export const addRating = async (dispatch, user, competence, rating) => {
   try {
      const rat = await axios.post(`competences/${competence._id}/ratings/${user._id}`, { rating });
      const userWithNewRat = {
         ...user,
         rating: user.rating.find((ras) => ras.competence_id === rat.data.data.competence_id)
            ? user.rating.map((rasa) =>
                 rasa.competence_id === rat.data.data.competence_id ? { ...rat.data.data } : rasa
              )
            : user.rating.concat(rat.data.data),
      };

      dispatch({ type: USERS_ADD_RATING, payload: { rating: rat.data.data, user: { ...userWithNewRat } } });
   } catch (error) {
      errorHandler(error, dispatch, USERS_LOAD_FAIL);
   }
};

export const clearUser = (dispatch) => {
   dispatch({ type: USERS_CLEAR_USER });
};

export const getDepartments = async (dispatch) => {
   try {
      const req = await axios.get('departments/');
      dispatch({ type: USERS_GET_DEPARTMENTS, payload: req.data.data });
   } catch (error) {
      errorHandler(error, dispatch, USERS_LOAD_FAIL);
   }
};

export const updateUser = async (dispatch, user) => {
   try {
      const req = await axios.put(`users/${user._id}`, { ...user });
      dispatch({ type: USERS_UPDATE_USER, payload: req.data.data });
   } catch (error) {
      errorHandler(error, dispatch, USERS_LOAD_FAIL);
   }
};

const UsersState = (props) => {
   const alertContext = useContext(AlertContext);
   const { setAlert } = alertContext;

   const initialState = {
      users: null,
      user: null,
      userCompetences: null,
      departments: [],
      error: null,
      loading: true,
   };

   const [state, dispatch] = useReducer(usersReducer, initialState);
   const { error } = state;

   useEffect(() => {
      if (error) {
         setAlert(error, 'danger');
         setTimeout(() => setUser(dispatch, null), 5000);
         dispatch({ type: CLEAR_ERRORS });
      }
   }, [error]);

   return <UsersContext.Provider value={{ state: state, dispatch }}>{props.children}</UsersContext.Provider>;
};

export default UsersState;
