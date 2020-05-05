import { SET_PANEL } from '../actions/types';


const initialState = {
  panel: ''
};

export default function(state = initialState, action){
  switch(action.type){
    case SET_PANEL:
      return {
        ...state,
        panel: action.payload
      };
    default:
      return state;
  }
}
