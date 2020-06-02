import { GET_BADGES, ADD_BADGE, BADGES_LOADING, ACCEPT_ISSUER, DECLINE_ISSUER, REQUEST_BADGE_PERMISSION } from '../actions/types';


const initialState = {
  badges: [],
  isLoading: false
};

export default function(state = initialState, action){
  switch(action.type){
    case BADGES_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_BADGE:
    case GET_BADGES:
    case ACCEPT_ISSUER:
    case DECLINE_ISSUER:
    case REQUEST_BADGE_PERMISSION:
      return {
        ...state,
        isLoading: false,
        badges: action.payload,
      };
    default:
      return state;
  }
}
