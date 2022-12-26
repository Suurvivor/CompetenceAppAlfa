import {
   USERS_GET_USER,
   USERS_GET_USERS,
   USERS_SET_USER,
   USERS_GET_COMPETENCE_GROUPS,
   USERS_CLEAR_USER,
   USERS_LOAD_FAIL,
   CLEAR_ERRORS,
   USERS_GET_DEPARTMENTS,
   USERS_UPDATE_USER,
   USERS_ADD_RATING,
} from '../types';

const usersReducer = (state, action) => {
   switch (action.type) {
      case USERS_GET_USER:
         return {
            ...state,
            user: action.payload,
            loading: false,
         };
      case USERS_GET_USERS:
         return {
            ...state,
            users: action.payload.map((user) =>
               user.name.toString().length >= 10
                  ? { ...user, shortName: `${user.name.slice(0, 10)}..` }
                  : { ...user, shortName: user.name }
            ),
            loading: false,
         };
      case USERS_SET_USER:
         return {
            ...state,
            user: action.payload,
         };

      case USERS_GET_COMPETENCE_GROUPS:
         return {
            ...state,
            userCompetences: action.payload.groups.map((group) => {
               let compListEdited = group.competenceListId.map((competence) => {
                  let rating = action.payload.user.rating.find((rat1) => rat1.competence_id === competence._id);
                  return rating
                     ? {
                          ...competence,
                          lastEdit: new Date(competence.lastEdit),
                          createdAt: new Date(competence.createdAt),
                          rating: {
                             ...rating,
                             created_at: new Date(rating.created_at),
                             lastmodify: new Date(rating.lastmodify),
                          },
                       }
                     : {
                          ...competence,
                          lastEdit: new Date(competence.lastEdit),
                          createdAt: new Date(competence.createdAt),
                          rating: {
                             rating: null,
                          },
                       };
               });
               return { ...group, competenceListId: compListEdited };
            }),
            loading: false,
         };
      case USERS_ADD_RATING:
         return {
            ...state,
            user: { ...action.payload.user },
            userCompetences: state.userCompetences.map((group) => {
               let compListEdited = group.competenceListId.map((competence) => {
                  let rating = action.payload.user.rating.find((rat1) => rat1.competence_id === competence._id);
                  return rating
                     ? {
                          ...competence,
                          lastEdit: new Date(competence.lastEdit),
                          createdAt: new Date(competence.createdAt),
                          rating: {
                             ...rating,
                             created_at: new Date(rating.created_at),
                             lastmodify: new Date(rating.lastmodify),
                          },
                       }
                     : {
                          ...competence,
                          lastEdit: new Date(competence.lastEdit),
                          createdAt: new Date(competence.createdAt),
                          rating: {
                             rating: null,
                          },
                       };
               });
               return { ...group, competenceListId: compListEdited };
            }),
            loading: false,
         };
      case USERS_UPDATE_USER:
         return {
            ...state,
            user: { ...action.payload },
            users: state.users.map((user) =>
               user._id === action.payload._id
                  ? {
                       ...action.payload,
                       shortName:
                          action.payload.name.toString().length >= 10
                             ? `${action.payload.name.slice(0, 10)}..`
                             : action.payload.name,
                    }
                  : user
            ),
            loading: false,
         };
      case USERS_CLEAR_USER:
         return {
            ...state,
            user: null,
            userCompetences: null,
            loading: false,
         };
      case USERS_GET_DEPARTMENTS:
         return {
            ...state,
            departments: action.payload,
            loading: false,
         };
      case USERS_LOAD_FAIL:
         return {
            ...state,
            error: action.payload,
            loading: false,
         };
      case CLEAR_ERRORS:
         return {
            ...state,
            error: null,
         };
      default:
         throw new Error(`Unsupported type of: ${action.type}`);
   }
};

export default usersReducer;
