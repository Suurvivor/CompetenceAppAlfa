import {
   USERS_GET_USER,
   USERS_GET_USERS,
   USERS_SET_USER,
   USERS_GET_COMPETENCE_GROUPS,
   USERS_CLEAR_USER,
   USERS_LOAD_FAIL,
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
                          rating: null,
                       };
               });
               return { ...group, competenceListId: compListEdited };
            }),
            loading: false,
         };
      case USERS_CLEAR_USER:
         return {
            ...state,
            user: null,
            loading: false,
         };
      case USERS_LOAD_FAIL:
         return {
            ...state,
            error: action.payload,
            loading: false,
         };
      default:
         throw new Error(`Unsupported type of: ${action.type}`);
   }
};

export default usersReducer;
