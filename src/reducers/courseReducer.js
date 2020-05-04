import { COURSES_LOADED, COURSES_LOADING, COURSE_UPDATED, COURSE_USER_SIGNIN, COURSE_USER_SIGNOUT, GET_PARTICIPANTS, ASSIGNE_BADGE, UNASSIGNE_BADGE, ASSIGNE_MULTIPLE_BADGES, COURSE_LOADED, COURSE_LOADING, SET_COURSE_PARAMS, COURSE_ERROR } from '../actions/types';


const initialState = {
  courses: null,
  course: null,
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
    case COURSE_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case COURSE_LOADED:
      return {
        ...state,
        isLoading: false,
        course: action.payload
      };
    case COURSE_UPDATED:
    case COURSE_USER_SIGNIN:
    case COURSE_USER_SIGNOUT:
    case GET_PARTICIPANTS:
    case ASSIGNE_BADGE:
    case UNASSIGNE_BADGE:
    case ASSIGNE_MULTIPLE_BADGES:
      return {
        ...state,
        course: action.payload
      };
    case COURSES_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case COURSES_LOADED:
      return {
        ...state,
        isLoading: false,
        courses: action.payload
      };
    case COURSE_ERROR:
      return {
        ...state,
        courses: null,
        isLoading: false
      };
    case SET_COURSE_PARAMS:
      return {
        ...state,
        params: action.payload
      };
    default:
      return state;
  }
}
