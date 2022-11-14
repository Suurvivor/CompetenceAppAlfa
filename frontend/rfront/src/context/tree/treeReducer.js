import {
   CLEAR_ERRORS,
   NETWORK_ERROR,
   TREE_LOAD_FAIL,
   TREE_LOAD_DEPARTMENTS,
   TREE_CREATE_DEPARTMNET,
   TREE_DELETE_DEPARTMNET,
   TREE_SET_CURRENT_DEPARTMENT,
   TREE_LOAD_WORKPLACES,
   TREE_CREATE_WORKPLACE,
   TREE_DELETE_WORKPLACE,
   TREE_GET_WORKPLACE_FAIL,
   TREE_SET_CURRENT_WORKPLACE,
   TREE_LOAD_COMPETENCES,
   TREE_UPDATE_COMPETENCE,
   TREE_GET_COMPETENCES_FAIL,
   TREE_ADD_COMPETENCE,
   TREE_UPDATE_GROUP,
   TREE_CREATE_GROUP,
} from '../types';

const treeReducer = (state, action) => {
   switch (action.type) {
      case TREE_LOAD_DEPARTMENTS:
         return {
            ...state,
            departments: action.payload,
            loading: false,
         };
      case TREE_CREATE_DEPARTMNET:
         return {
            ...state,
            departments: [...state.departments, action.payload],
            loading: false,
         };
      case TREE_DELETE_DEPARTMNET:
         return {
            ...state,
            departments: state.departments.filter((department) => department._id !== action.payload),
            loading: false,
         };
      case TREE_SET_CURRENT_DEPARTMENT:
         return {
            ...state,
            currentDepartment: action.payload,
            loading: false,
         };
      case TREE_LOAD_WORKPLACES:
         return {
            ...state,
            workplaces: action.payload,
            loading: false,
         };
      case TREE_CREATE_WORKPLACE:
         return {
            ...state,
            workplaces: [...state.workplaces, action.payload],
            loading: false,
         };
      case TREE_DELETE_WORKPLACE:
         return {
            ...state,
            workplaces: state.workplaces.filter((workplace) => workplace._id !== action.payload),
            loading: false,
         };
      case TREE_GET_WORKPLACE_FAIL:
         return {
            ...state,
            competences: [],
            workplaces: [],
            currentWorkplace: null,
            loading: false,
         };
      case TREE_SET_CURRENT_WORKPLACE:
         return {
            ...state,
            currentWorkplace: action.payload,
         };
      case TREE_LOAD_COMPETENCES:
         return {
            ...state,
            competences: action.payload,
            loading: false,
         };
      case TREE_GET_COMPETENCES_FAIL:
         return {
            ...state,
            competences: [],
            loading: false,
         };
      case TREE_UPDATE_COMPETENCE:
         return {
            ...state,
            competences: state.competences.map((competenceGroup) => {
               let editedListOfCompetences = competenceGroup.competenceListId.map((competenceItem) =>
                  competenceItem._id === action.payload._id ? action.payload : competenceItem
               );
               return { ...competenceGroup, competenceListId: editedListOfCompetences };
            }),
            loading: false,
         };
      case TREE_ADD_COMPETENCE:
         return {
            ...state,
            competences: state.competences.map((competenceGroup) => {
               if (competenceGroup._id === action.payload.groupId) {
                  competenceGroup.competenceListId.push(action.payload);
               }
               return { ...competenceGroup };
            }),
            loading: false,
         };
      case TREE_UPDATE_GROUP:
         return {
            ...state,
            competences: state.competences.map((competenceGroup) => {
               if (competenceGroup._id === action.payload.groupId) {
                  return { ...competenceGroup, name: action.payload.name };
               } else {
                  return competenceGroup;
               }
            }),
            loading: false,
         };
      case TREE_CREATE_GROUP:
         return {
            ...state,
            competences: [...state.competences, action.payload],
            loading: false,
         };
      case NETWORK_ERROR:
      case TREE_LOAD_FAIL:
         return {
            ...state,
            error: action.payload,
            loading: false,
         };
      case CLEAR_ERRORS:
         return {
            ...state,
            error: null,
            loading: false,
         };
      default:
         throw new Error(`Unsupported type of: ${action.type}`);
   }
};

export default treeReducer;
