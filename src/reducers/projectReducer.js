import { PROJECTS_LOADED, PROJECTS_LOADING, PROJECT_UPDATED, PROJECT_USER_SIGNIN, PROJECT_USER_SIGNOUT, GET_PARTICIPANTS, ASSIGNE_BADGE, UNASSIGNE_BADGE, ASSIGNE_MULTIPLE_BADGES, PROJECT_LOADED, PROJECT_LOADING, SET_PROJECT_PARAMS, PROJECT_ERROR } from '../actions/types';


const initialState = {
  projects: null,
  project: null,
  isLoading: false,
  params: {
    type: '',
    online: false,
    name: '',
    topic: '',
    coordinates: null,
    radius: 15,
    startdate: null,
    enddate: null,
    parameter: 0,
    addresses: [],
    address: ''
  }
};

export default function(state = initialState, action){
  switch(action.type){
    case PROJECT_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case PROJECT_LOADED:
      return {
        ...state,
        isLoading: false,
        project: action.payload
      };
    case PROJECT_UPDATED:
    case PROJECT_USER_SIGNIN:
    case PROJECT_USER_SIGNOUT:
    case GET_PARTICIPANTS:
    case ASSIGNE_BADGE:
    case UNASSIGNE_BADGE:
    case ASSIGNE_MULTIPLE_BADGES:
      return {
        ...state,
        project: action.payload
      };
    case PROJECTS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case PROJECTS_LOADED:
      return {
        ...state,
        isLoading: false,
        projects: action.payload
      };
    case PROJECT_ERROR:
      return {
        ...state,
        projects: null,
        isLoading: false
      };
    case SET_PROJECT_PARAMS:
      return {
        ...state,
        params: action.payload
      };
    default:
      return state;
  }
}
