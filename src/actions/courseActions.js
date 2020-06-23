import axios from 'axios';
import { returnErrors, returnSuccess } from './messageActions'

import {
  COURSE_LOADED,
  COURSE_LOADING,
  COURSE_UPDATED,
  COURSE_USER_SIGNIN,
  COURSE_USER_SIGNOUT,
  GET_PARTICIPANTS,
  ASSIGNE_BADGE,
  UNASSIGNE_BADGE,
  ASSIGNE_MULTIPLE_BADGES,
  COURSES_LOADED,
  COURSES_LOADING,
  COURSE_ERROR,
  SET_COURSE_PARAMS
} from '../actions/types';

// get one course
export const loadCourse = (id) => (dispatch) => {
  dispatch({
    type: COURSE_LOADING
  });
  axios.get(`/api/v1/course/${id}`)
    .then(res => {
      if(!res.data.course.exists){
        dispatch(returnSuccess('Dieses Projekt ist deaktiviert.', res.status, 'COURSE_DEACTIVATED'));
      }
      dispatch({
        type: COURSE_LOADED,
        payload: res.data.course
      });
    })
    .catch(err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'COURSE_ERROR'));
      }
    });
};

// update one course
export const updateCourse = (id, updatedCourse) => (dispatch) => {
  const config = {
    success: res => {
      dispatch({
        type: COURSE_UPDATED,
        payload: res.data.course
      });
      dispatch(returnSuccess(res.data.message, res.status, 'COURSE_UPDATED_SUCCESS'));
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'COURSE_UPDATED_ERROR'));
      }
    }
  };
  axios.put(`/api/v1/course/${id}`, updatedCourse, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      if(err.response.status !== 401){
        err.config.error(err);
      }
    });
};

// user signs in
export const signIn = (id) => (dispatch, getState) => {
  var course = getState().course.course;
  const config = {
    success: res => {
      course.participants.push(getState().auth.user._id);
      dispatch({
        type: COURSE_USER_SIGNIN,
        payload: course
      });
      dispatch(returnSuccess(res.data.message, res.status, 'COURSE_UPDATED_SUCCESS'));
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'COURSE_REGISTRATION_ERROR'));
      }
    }
  };
  axios.put(`/api/v1/course/${id}/user/registration`, {}, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      if(err.response.status !== 401){
        err.config.error(err);
      }
    });
};

// user signs out
export const signOut = (id) => (dispatch, getState) => {
  var course = getState().course.course;
  const config = {
    success: res => {
      course.participants = course.participants.filter(userId => getState().auth.user._id !== userId);
      dispatch({
        type: COURSE_USER_SIGNOUT,
        payload: course
      });
      dispatch(returnSuccess(res.data.message, res.status, 'COURSE_UPDATED_SUCCESS'));
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'COURSE_REGISTRATION_ERROR'));
      }
    }
  };
  axios.put(`/api/v1/course/${id}/user/deregistration`, {}, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      if(err.response.status !== 401){
        err.config.error(err);
      }
    });
};

export const getParticipants = (courseId) => (dispatch, getState) => {
  var course = getState().course.course;
  const config = {
    success: res => {
      course.participants = res.data.participants;
      dispatch({
        type: GET_PARTICIPANTS,
        payload: course
      });
      dispatch(returnSuccess(res.data.message, res.status, 'COURSE_PARTICIPANTS_SUCCESS'));
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'COURSE_PARTICIPANTS_ERROR'));
      }
    }
  };
  axios.get(`/api/v1/course/${courseId}/participants`, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      if(err.response.status !== 401){
        err.config.error(err);
      }
    });
}

export const assigneBadge = (badgeId, courseId, userId) => (dispatch, getState) => {
  var course = getState().course.course;
  const config = {
    success: res => {
      const index = course.participants.findIndex(user => user._id === userId);
      course.participants[index].badge.push(badgeId);
      dispatch({
        type: ASSIGNE_BADGE,
        payload: course
      });
      dispatch(returnSuccess(res.data.message, res.status, 'ASSIGNE_SUCCESS'));
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'ASSIGNE_ERROR'));
      }
    }
  };
  axios.put(`/api/v1/badge/${badgeId}/course/${courseId}/assigne/user/${userId}`, {}, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      if(err.response.status !== 401){
        err.config.error(err);
      }
    });
};

export const unassigneBadge = (badgeId, courseId, userId) => (dispatch, getState) => {
  var course = getState().course.course;
  const config = {
    success: res => {
      const index = course.participants.findIndex(user => user._id === userId);
      var updatedBadges = course.participants[index].badge.filter(bId => bId !== badgeId);
      course.participants[index].badge = updatedBadges;
      dispatch({
        type: UNASSIGNE_BADGE,
        payload: course
      });
      dispatch(returnSuccess(res.data.message, res.status, 'UNASSIGNE_SUCCESS'));
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'UNASSIGNE_ERROR'));
      }
    }
  };
  axios.put(`/api/v1/badge/${badgeId}/course/${courseId}/unassigne/user/${userId}`, {}, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      if(err.response.status !== 401){
        err.config.error(err);
      }
    });
};

export const assigneMultipleBadges = (courseId, badges) => (dispatch, getState) => {
  var course = getState().course.course;
  var body = {
    badges: badges
  };
  const config = {
    success: res => {
      Object.keys(badges).forEach((userId, i) => {
        const index = course.participants.findIndex(user => user._id === userId);
        badges[userId].forEach((badgeId, i) => {
          course.participants[index].badge.push(badgeId);
        });
      });
      dispatch({
        type: ASSIGNE_MULTIPLE_BADGES,
        payload: course
      });
      dispatch(returnSuccess(res.data.message, res.status, 'MULTIPLE_ASSIGNE_SUCCESS'));
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'MULTIPLE_ASSIGNE_ERROR'));
      }
    }
  };
  axios.put(`/api/v1/badge/course/${courseId}/assigne`, body, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      if(err.response.status !== 401){
        err.config.error(err);
      }
    });
};

// get courses
export const loadCourses = (url, params) => (dispatch, getState) => {
  var parameter = getState().course.params;
  if(parameter.type === 'online'){
    parameter.online = true;
    dispatch({
      type: SET_COURSE_PARAMS,
      payload: parameter
    });
  }
  else {
    parameter.online = false;
    dispatch({
      type: SET_COURSE_PARAMS,
      payload: parameter
    });
  }
  dispatch({
    type: COURSES_LOADING
  });
  const config = {
    params: params,
    success: res => {
      dispatch(returnSuccess(res.data.message, res.status));
      dispatch({
        type: COURSES_LOADED,
        payload: res.data.courses
      })
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'COURSES_ERROR'));
      }
      dispatch({
        type: COURSE_ERROR
      });
    }
  };
  axios.get(url, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      if(err.response.status !== 401){
        err.config.error(err);
      }
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
  });
};
