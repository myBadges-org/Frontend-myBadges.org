import { GET_BADGES, ADD_BADGE } from '../actions/types';


const initialState = {
  badges: []
};

export default function(state = initialState, action){
  switch(action.type){
    case GET_BADGES:
    case ADD_BADGE:
      return {
        badges: action.payload,
      };
    default:
      return state;
  }
}
