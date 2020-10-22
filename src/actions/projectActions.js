import axios from 'axios';
import { returnErrors, returnSuccess } from './messageActions'

import moment from 'moment';

import {
  PROJECT_LOADED,
  PROJECT_LOADING,
  PROJECT_UPDATED,
  PROJECT_USER_SIGNIN,
  PROJECT_USER_SIGNOUT,
  GET_PARTICIPANTS,
  ASSIGNE_BADGE,
  UNASSIGNE_BADGE,
  ASSIGNE_MULTIPLE_BADGES,
  PROJECTS_LOADED,
  PROJECTS_LOADING,
  PROJECT_ERROR,
  SET_PROJECT_PARAMS
} from '../actions/types';

// get one project
export const loadProject = (id) => (dispatch) => {
  dispatch({
    type: PROJECT_LOADING
  });
  axios.get(`/api/v1/project/${id}`)
    .then(res => {
      if(!res.data.project.exists){
        dispatch(returnSuccess('Dieses Projekt ist deaktiviert.', res.status, 'PROJECT_DEACTIVATED'));
      }
      dispatch({
        type: PROJECT_LOADED,
        payload: res.data.project
      });
    })
    .catch(err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'PROJECT_ERROR'));
      }
    });
};

// update one project
export const updateProject = (id, updatedProject) => (dispatch) => {
  const config = {
    success: res => {
      dispatch({
        type: PROJECT_UPDATED,
        payload: res.data.project
      });
      dispatch(returnSuccess(res.data.message, res.status, 'PROJECT_UPDATED_SUCCESS'));
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'PROJECT_UPDATED_ERROR'));
      }
    }
  };
  axios.put(`/api/v1/project/${id}`, updatedProject, config)
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
  var project = getState().project.project;
  const config = {
    success: res => {
      project.participants.push(getState().auth.user._id);
      dispatch({
        type: PROJECT_USER_SIGNIN,
        payload: project
      });
      dispatch(returnSuccess(res.data.message, res.status, 'PROJECT_UPDATED_SUCCESS'));
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'PROJECT_REGISTRATION_ERROR'));
      }
    }
  };
  axios.put(`/api/v1/project/${id}/user/registration`, {}, config)
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
  var project = getState().project.project;
  const config = {
    success: res => {
      project.participants = project.participants.filter(userId => getState().auth.user._id !== userId);
      dispatch({
        type: PROJECT_USER_SIGNOUT,
        payload: project
      });
      dispatch(returnSuccess(res.data.message, res.status, 'PROJECT_UPDATED_SUCCESS'));
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'PROJECT_REGISTRATION_ERROR'));
      }
    }
  };
  axios.put(`/api/v1/project/${id}/user/deregistration`, {}, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      if(err.response.status !== 401){
        err.config.error(err);
      }
    });
};

export const getParticipants = (projectId) => (dispatch, getState) => {
  var project = getState().project.project;
  const config = {
    success: res => {
      project.participants = res.data.participants;
      dispatch({
        type: GET_PARTICIPANTS,
        payload: project
      });
      dispatch(returnSuccess(res.data.message, res.status, 'PROJECT_PARTICIPANTS_SUCCESS'));
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'PROJECT_PARTICIPANTS_ERROR'));
      }
    }
  };
  axios.get(`/api/v1/project/${projectId}/participants`, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      if(err.response.status !== 401){
        err.config.error(err);
      }
    });
}

export const assigneBadge = (badgeId, projectId, userId) => (dispatch, getState) => {
  var project = getState().project.project;
  const config = {
    success: res => {
      const index = project.participants.findIndex(user => user._id === userId);
      project.participants[index].badge.push(badgeId);
      dispatch({
        type: ASSIGNE_BADGE,
        payload: project
      });
      dispatch(returnSuccess(res.data.message, res.status, 'ASSIGNE_SUCCESS'));
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'ASSIGNE_ERROR'));
      }
    }
  };
  axios.put(`/api/v1/badge/${badgeId}/project/${projectId}/assigne/user/${userId}`, {}, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      if(err.response.status !== 401){
        err.config.error(err);
      }
    });
};

export const unassigneBadge = (badgeId, projectId, userId) => (dispatch, getState) => {
  var project = getState().project.project;
  const config = {
    success: res => {
      const index = project.participants.findIndex(user => user._id === userId);
      var updatedBadges = project.participants[index].badge.filter(bId => bId !== badgeId);
      project.participants[index].badge = updatedBadges;
      dispatch({
        type: UNASSIGNE_BADGE,
        payload: project
      });
      dispatch(returnSuccess(res.data.message, res.status, 'UNASSIGNE_SUCCESS'));
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'UNASSIGNE_ERROR'));
      }
    }
  };
  axios.put(`/api/v1/badge/${badgeId}/project/${projectId}/unassigne/user/${userId}`, {}, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      if(err.response.status !== 401){
        err.config.error(err);
      }
    });
};

export const assigneMultipleBadges = (projectId, badges) => (dispatch, getState) => {
  var project = getState().project.project;
  var body = {
    badges: badges
  };
  const config = {
    success: res => {
      Object.keys(badges).forEach((userId, i) => {
        const index = project.participants.findIndex(user => user._id === userId);
        badges[userId].forEach((badgeId, i) => {
          project.participants[index].badge.push(badgeId);
        });
      });
      dispatch({
        type: ASSIGNE_MULTIPLE_BADGES,
        payload: project
      });
      dispatch(returnSuccess(res.data.message, res.status, 'MULTIPLE_ASSIGNE_SUCCESS'));
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'MULTIPLE_ASSIGNE_ERROR'));
      }
    }
  };
  axios.put(`/api/v1/badge/project/${projectId}/assigne`, body, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      if(err.response.status !== 401){
        err.config.error(err);
      }
    });
};

// get projects
export const loadProjects = (url, params, successCb) => (dispatch, getState) => {
  var parameter = getState().project.params;
  if(parameter.type === 'online'){
    parameter.online = true;
    dispatch({
      type: SET_PROJECT_PARAMS,
      payload: parameter
    });
  }
  else {
    parameter.online = false;
    dispatch({
      type: SET_PROJECT_PARAMS,
      payload: parameter
    });
  }
  dispatch({
    type: PROJECTS_LOADING
  });
  const config = {
    params: params,
    success: res => {
      dispatch({
        type: PROJECTS_LOADED,
        payload: res.data.projects
      })
      if(!successCb){
        dispatch(returnSuccess(res.data.message, res.status));
      }
    },
    error: err => {
      console.log(err);
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'PROJECTS_ERROR'));
      }
      dispatch({
        type: PROJECT_ERROR
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
  var params = getState().project.params;
  params[e.target.name] = e.target.value;
  dispatch({
    type: SET_PROJECT_PARAMS,
    payload: params
  });
};

export const sliderOnChange = (e, value) => (dispatch, getState) => {
  var params = getState().project.params;
  params.radius = value;
  dispatch({
    type: SET_PROJECT_PARAMS,
    payload: params
  });
};

export const onChangeAddress = (e) => (dispatch, getState) => {
  var params = getState().project.params;
  if(e.target.value){
    axios.get(`https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${e.target.value}`)
      .then(res => {
        if(res.data.length > 0){
          params.addresses = res.data;
        } else {
          params.addresses = ['Keine Übereinstimmung gefunden.'];
        }
        dispatch({
          type: SET_PROJECT_PARAMS,
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
      type: SET_PROJECT_PARAMS,
      payload: params
    });
  }
};


export const deleteAddress = () => (dispatch, getState) => {
  var params = getState().project.params;
  params.addresses = [];
  params.address = '';
  dispatch({
    type: SET_PROJECT_PARAMS,
    payload: params
  });
};

export const setAddress = (address) => (dispatch, getState) => {
  var params = getState().project.params;
  params.coordinates = [address.lon, address.lat];
  params.addresses = [];
  params.address = address.display_name;
  dispatch({
    type: SET_PROJECT_PARAMS,
    payload: params
  });
};


export const onReset = (url) => (dispatch) => {
  dispatch(clearParams());
  dispatch(loadProjects(url));
};


export const onFilter = (url) => (dispatch, getState) => {
  var params = getState().project.params;
  const { type, coordinates, radius, startdate, enddate, topic, name } = params;
  const configParams = {};
  if(Date.parse(moment(startdate).format('YYYY-MM-DD'))) configParams.startdate = moment(startdate).format('YYYY-MM-DD');
  if(Date.parse(moment(enddate).format('YYYY-MM-DD'))) configParams.enddate = moment(enddate).format('YYYY-MM-DD');
  if(type !== '') configParams.type = type;
  if(name !== '') configParams.name = name;
  if(topic !== '') configParams.topic = topic;
  if(type !== 'online' && coordinates){
    configParams.coordinates = coordinates;
    configParams.radius = radius;
  }
  params.parameter = Object.values(configParams).filter(param => param !== null && param !== undefined && param !== '').length;
  dispatch({
    type: SET_PROJECT_PARAMS,
    payload: params
  })
  dispatch(loadProjects(url, configParams));
};


export const clearParams = () => (dispatch) => {
  dispatch({
    type: SET_PROJECT_PARAMS,
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
