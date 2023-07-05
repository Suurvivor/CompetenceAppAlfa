import React, { useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import TreeContext from './treeContext';
import treeReducer from './treeReducer';
import AlertContext from '../alert/alertContext';
import { errorHandler } from '../../utils/requestErrorHandler';
import {
   CLEAR_ERRORS,
   TREE_LOAD_DEPARTMENTS,
   TREE_CREATE_DEPARTMNET,
   TREE_DELETE_DEPARTMNET,
   TREE_SET_CURRENT_DEPARTMENT,
   TREE_LOAD_FAIL,
   TREE_LOAD_WORKPLACES,
   TREE_CREATE_WORKPLACE,
   TREE_DELETE_WORKPLACE,
   TREE_GET_WORKPLACE_FAIL,
   TREE_SET_CURRENT_WORKPLACE,
   TREE_LOAD_COMPETENCES,
   TREE_GET_COMPETENCES_FAIL,
   TREE_UPDATE_COMPETENCE,
   TREE_ADD_COMPETENCE,
   TREE_UPDATE_GROUP,
   TREE_CREATE_GROUP,
} from '../types';

// Create a custom hook to use the auth context

export const useTree = () => {
   const { state, dispatch } = useContext(TreeContext);
   return [state, dispatch];
};

export const getDepartments = async (dispatch) => {
   try {
      const res = await axios.get('/departments');
      dispatch({ type: TREE_LOAD_DEPARTMENTS, payload: res.data.data });
   } catch (error) {
      errorHandler(error, dispatch, TREE_LOAD_FAIL);
   }
};

// do dokonczenia
export const getDepartmentByName = async (name) => {
   try {
      const res = await axios.get('/departments/:id');
   } catch (error) {}
};

export const createDepartment = async (dispatch, name) => {
   try {
      const res = await axios.post('/departments', { name: name });
      dispatch({ type: TREE_CREATE_DEPARTMNET, payload: res.data.data });
   } catch (error) {
      errorHandler(error, dispatch, TREE_LOAD_FAIL);
   }
};

export const deleteDepartment = async (dispatch, departmentId) => {
   try {
      const res = await axios.delete(`/departments/${departmentId}`);
      dispatch({ type: TREE_DELETE_DEPARTMNET, payload: departmentId });
   } catch (error) {
      errorHandler(error, dispatch, TREE_LOAD_FAIL);
   }
};

export const setCurrentDepartment = (dispatch, id) => {
   dispatch({ type: TREE_SET_CURRENT_DEPARTMENT, payload: id });
};

export const getWorkplaces = async (dispatch, departmentId) => {
   try {
      const res = await axios.get(`/departments/${departmentId}/workplaces`);
      dispatch({ type: TREE_LOAD_WORKPLACES, payload: res.data.data });
   } catch (error) {
      errorHandler(error, dispatch, TREE_GET_WORKPLACE_FAIL);
   }
};

export const createWorkplace = async (dispatch, departmentId, name) => {
   try {
      const res = await axios.post(`/departments/${departmentId}/workplaces`, { name: name });
      dispatch({ type: TREE_CREATE_WORKPLACE, payload: res.data.data });
   } catch (error) {
      errorHandler(error, dispatch, TREE_LOAD_FAIL);
   }
};

export const deleteWorkplace = async (dispatch, workplaceId) => {
   try {
      const res = await axios.delete(`/workplaces/${workplaceId}`);
      dispatch({ type: TREE_DELETE_WORKPLACE, payload: workplaceId });
   } catch (error) {
      errorHandler(error, dispatch, TREE_LOAD_FAIL);
   }
};

export const setCurrentWorkplace = (dispatch, id) => {
   dispatch({ type: TREE_SET_CURRENT_WORKPLACE, payload: id });
};

export const getCompetences = async (dispatch, workplaceId) => {
   try {
      const res = await axios.get(`/groupcompetences/workplace/${workplaceId}`);
      dispatch({ type: TREE_LOAD_COMPETENCES, payload: res.data.data });
   } catch (error) {
      errorHandler(error, dispatch, TREE_GET_COMPETENCES_FAIL);
   }
};

export const updateCompetence = async (dispatch, competence, cbError) => {
   try {
      const res = await axios.put(`/competences/${competence._id}`, competence);
      dispatch({ type: TREE_UPDATE_COMPETENCE, payload: res.data.data });
   } catch (error) {
      errorHandler(error, dispatch, TREE_LOAD_FAIL);
      cbError();
   }
};

export const addCompetenceAndAddToGroup = async (dispatch, formData, groupCompetenceId, workplaceId) => {
   try {
      const res = await axios.post(`/workplaces/${workplaceId}/competences`, formData);
      const res2 = await axios.post(`/groupcompetences/${groupCompetenceId}`, { competenceId: res.data.data._id });

      dispatch({ type: TREE_ADD_COMPETENCE, payload: { ...res.data.data, groupId: groupCompetenceId } });
   } catch (error) {
      errorHandler(error, dispatch, TREE_LOAD_FAIL);
   }
};

export const createGroup = async (dispatch, workplaceId, name) => {
   try {
      const res = await axios.post(`/groupcompetences/`, { name: name, workplaceId: workplaceId });
      dispatch({ type: TREE_CREATE_GROUP, payload: { ...res.data.data } });
   } catch (error) {
      errorHandler(error, dispatch, TREE_LOAD_FAIL);
   }
};

//for now only update name
export const updateGroup = async (dispatch, formData, groupCompetenceId) => {
   try {
      const res = await axios.post(`/groupcompetences/${groupCompetenceId}`, { name: formData });
      dispatch({ type: TREE_UPDATE_GROUP, payload: { ...res.data.data, groupId: groupCompetenceId } });
   } catch (error) {
      errorHandler(error, dispatch, TREE_LOAD_FAIL);
   }
};

const TreeState = (props) => {
   const alertContext = useContext(AlertContext);
   const { setAlert } = alertContext;

   const initialState = {
      departments: [],
      currentDepartment: null,
      workplaces: [],
      currentWorkplace: null,
      competences: [],
      error: null,
      loading: true,
   };

   const [state, dispatch] = useReducer(treeReducer, initialState);
   const { error } = state;

   useEffect(() => {
      if (error) {
         setAlert(error, 'danger');
         dispatch({ type: CLEAR_ERRORS });
      }
   }, [error]);

   return <TreeContext.Provider value={{ state: state, dispatch }}>{props.children}</TreeContext.Provider>;
};

export default TreeState;
