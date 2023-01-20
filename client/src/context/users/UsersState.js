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
   USERS_USER_PLAN_TRAIN,
   USERS_SET_LOADING,
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
      console.log(`start geting users ...`);
      const req = await axios.get(`users/?s=${searchInput}`);
      console.log(`end got users !`);
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

export const addRating = async (dispatch, user, competence, ratingGrade, loading) => {
   let grade = parseInt(ratingGrade, 10);
   if (grade > 4 || grade < 0) grade = 0;

   try {
      const rat = await axios.post(`competences/${competence._id}/ratings/${user._id}`, {
         rating: grade,
         competence_id: competence._id,
      });
      let userWithNewRat = {
         ...user,
      };
      if (user.rating.find((ras) => ras.competence_id === rat.data.data.competence_id)) {
         userWithNewRat = {
            ...userWithNewRat,
            rating: user.rating.map((rasa) =>
               rasa.competence_id === rat.data.data.competence_id
                  ? { ...rat.data.data, odbytnica: true }
                  : { ...rasa, edited: true }
            ),
         };
      } else {
         userWithNewRat.rating.push(rat.data.data);
      }
      loading(false);
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

export const planTraining = async (dispatch, planedTraining) => {
   try {
      const req = await axios.post(`planingtraining/`, planedTraining);
      dispatch({ type: USERS_USER_PLAN_TRAIN, payload: req.data.data });
   } catch (error) {
      errorHandler(error, dispatch, USERS_LOAD_FAIL);
   }
};

export const setLoading = (dispatch, loading) => {
   dispatch({ type: USERS_SET_LOADING, payload: loading });
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
