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
   NETWORK_ERROR,
   ERROR,
} from '../types';

const authReducer = (state, action) => {
   switch (action.type) {
      case USER_LOADED:
         return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: action.payload,
         };
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
         return {
            ...state,
            token: action.payload,
            isAuthenticated: true,
            loading: false,
         };
      case GET_GROUPED_COMPETENCES_AUTH:
         const groupsWithUserRating = action.payload.groups.data.data.map((group) => {
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
                       rating: { rating: null },
                    };
            });
            return { ...group, competenceListId: compListEdited };
         });

         return {
            ...state,
            competenceGroups: { groups: [...groupsWithUserRating], loading: false },
            loading: false,
         };
      case GET_GROUPED_COMPETENCES_AUTH_ERROR:
         return {
            ...state,
            competenceGroups: { groups: [], loading: false },
            error: action.payload,
         };

      case NETWORK_ERROR:
      case ERROR:
      case REGISTER_FAIL:
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
         return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
            error: action.payload,
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

export default authReducer;
