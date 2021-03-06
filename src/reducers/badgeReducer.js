import { GET_BADGES, ADD_BADGE, CHANGE_BADGE, CHANGE_BADGES, BADGES_LOADING, DEACTIVATE_BADGE, SET_BADGE_PARAMS, NOMINATE_ISSUER, ACCEPT_MENTOR, DECLINE_MENTOR, REQUEST_BADGE_PERMISSION } from '../actions/types';


const initialState = {
  badges: [],
  badge: null,
  isLoading: false,
  params: {
    category: '',
    name: false,
    description: '',
    parameter: 0
  }
};

export default function(state = initialState, action){
  switch(action.type){
    case BADGES_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_BADGE:
    case CHANGE_BADGES:
    case GET_BADGES:
    case DEACTIVATE_BADGE:
    case ACCEPT_MENTOR:
    case DECLINE_MENTOR:
    case NOMINATE_ISSUER:
    case REQUEST_BADGE_PERMISSION:
      return {
        ...state,
        isLoading: false,
        badges: action.payload,
      };
    case CHANGE_BADGE:
      return {
        ...state,
        badge: action.payload
      }
    case SET_BADGE_PARAMS:
      return {
        ...state,
        params: action.payload
      }
    default:
      return state;
  }
}
