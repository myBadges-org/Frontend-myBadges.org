import { GET_BADGES, ADD_BADGE, BADGES_LOADING } from '../actions/types';


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
      return {
        ...state,
        isLoading: false,
        badges: action.payload,
      };
    default:
      return state;
  }
}
