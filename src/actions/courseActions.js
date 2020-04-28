import axios from 'axios';
import { returnErrors } from './messageActions'

import {
  COURSE_LOADED,
  COURSE_LOADING,
  COURSE_ERROR,
  SET_COURSE_PARAMS
} from '../actions/types';


// get courses
export const loadCourses = (url, params) => (dispatch) => {
  dispatch({
    type: COURSE_LOADING
  });
  const config = {
    params: params
  };
  axios.get(url, config)
    .then(res => dispatch({
        type: COURSE_LOADED,
        payload: res.data.courses
      })
    )
    .catch(err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'COURSE_ERROR'));
      }
      dispatch({
        type: COURSE_ERROR
      });
    });
};


export const paramsOnChange = (e) => (dispatch, getState) => {
  var params = getState().course.params;
  params[e.target.name] = e.target.value;
  dispatch({
    type: SET_COURSE_PARAMS,
    payload: params
  });
};

export const sliderOnChange = (e, value) => (dispatch, getState) => {
  var params = getState().course.params;
  params.radius = value;
  dispatch({
    type: SET_COURSE_PARAMS,
    payload: params
  });
};

export const onChangeAddress = (e) => (dispatch, getState) => {
  var params = getState().course.params;
  if(e.target.value){
    axios.get(`https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${e.target.value}`)
      .then(res => {
        if(res.data.length > 0){
          params.addresses = res.data;
        } else {
          params.addresses = ['Keine Übereinstimmung gefunden.'];
        }
        dispatch({
          type: SET_COURSE_PARAMS,
          payload: params
        });
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data.message, err.response.status));
      });
  }
  else {
    params.addresses = [];
    dispatch({
      type: SET_COURSE_PARAMS,
      payload: params
    });
  }
};


export const deleteAddress = () => (dispatch, getState) => {
  var params = getState().course.params;
  params.addresses = [];
  params.address = '';
  dispatch({
    type: SET_COURSE_PARAMS,
    payload: params
  });
};

export const setAddress = (address) => (dispatch, getState) => {
  var params = getState().course.params;
  params.coordinates = [address.lon, address.lat];
  params.addresses = [];
  params.address = address.display_name;
  dispatch({
    type: SET_COURSE_PARAMS,
    payload: params
  });
};


export const onReset = (url) => (dispatch) => {
  dispatch(clearParams());
  dispatch(loadCourses(url));
};


export const onFilter = (url) => (dispatch, getState) => {
  var params = getState().course.params;
  const { type, coordinates, radius, startdate, enddate, topic, name } = params;
  const configParams = {
    startdate,
    enddate,
  };
  if(type !== '') configParams.type = type;
  if(name !== '') configParams.name = name;
  if(topic !== '') configParams.topic = topic;
  if(type !== 'online' && coordinates){
    configParams.coordinates = coordinates;
    configParams.radius = radius;
  }
  params.parameter = Object.values(configParams).filter(param => param !== null && param !== undefined && param !== '').length;
  dispatch({
    type: SET_COURSE_PARAMS,
    payload: params
  })
  dispatch(loadCourses(url, configParams));
};


export const clearParams = () => (dispatch) => {
  dispatch({
    type: SET_COURSE_PARAMS,
    payload: {
      type: '',
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
  });
};
