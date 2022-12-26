import { SET_BOX_MID_CARD, CLOSE_BOX_MID_CARD } from '../types';

const boxMidCardReducer = (state, action) => {
   switch (action.type) {
      case SET_BOX_MID_CARD:
         return {
            show: true,
            title: action.payload.title,
            body: action.payload.body,
         };
      case CLOSE_BOX_MID_CARD:
         return {
            show: false,
            title: 'Box Mid Card',
            body: null,
         };

      default:
         throw new Error(`Unsupported type of: ${action.type}`);
   }
};

export default boxMidCardReducer;
