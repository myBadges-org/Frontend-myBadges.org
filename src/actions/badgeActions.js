import { GET_BADGES, ADD_BADGE, BADGES_LOADING, ACCEPT_ISSUER, DECLINE_ISSUER, REQUEST_BADGE_PERMISSION } from './types';

import axios from 'axios';
import { returnErrors, returnSuccess } from './messageActions'

// get badges from API
export const getBadges = (params) => (dispatch) => {
  dispatch({type: BADGES_LOADING});
  axios.get('/api/v1/badge', {params: params})
    .then(res => {
      dispatch({
        type: GET_BADGES,
        payload: res.data.badges
      });
      dispatch(returnSuccess(res.data.message, res.status, 'GET_BADGES_SUCCESS'));
    })
    .catch(err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'GET_BADGES_FAIL'));
      }
    });
};

// add badge to API
export const addBadge = (newBadge, admin) => (dispatch, getState) => {
  const config = {
    success: res => {
      var badges = getState().badge.badges;
      badges.push(res.data.badge);
      dispatch(returnErrors(res.data.message, res.status, 'ADD_BADGE_SUCCESS'));
      dispatch({
        type: ADD_BADGE,
        payload: badges
      });
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'ADD_BADGE_FAIL'));
      }
    }
  };
  var url = '/api/v1/badge';
  if(admin) url = 'api/v1/admin/badge';
  axios.post(url, newBadge, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      if(err.response.status !== 401){
        err.config.error(err);
      }
    });
};


// accecpt issuer-request
export const acceptIssuerRequest = (badgeId, userId) => (dispatch, getState) => {
  const config = {
    success: res => {
      var badges = getState().badge.badges;
      const badgeIndex = badges.map(badge => badge._id).indexOf(badgeId);
      badges[badgeIndex].issuer.push(badges[badgeIndex].request.filter(user => user._id === userId)[0]);
      badges[badgeIndex].request = badges[badgeIndex].request.filter(user => user._id !== userId);
      dispatch({
        type: ACCEPT_ISSUER,
        payload: badges
      });
      dispatch(returnSuccess(res.data.message, res.status, 'ACCEPT_ISSUER_SUCCESS'));
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'ACCEPT_ISSUER_ERROR'));
      }
    }
  };
  axios.put(`/api/v1/badge/${badgeId}/grant/${userId}`, {}, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      if(err.response && err.response.status !== 401){
        err.config.error(err);
      }
    });
};

// decline issuer-request
export const declineIssuerRequest = (badgeId, userId) => (dispatch, getState) => {
  const config = {
    success: res => {
      var badges = getState().badge.badges;
      const badgeIndex = badges.map(badge => badge._id).indexOf(badgeId);
      badges[badgeIndex].issuer = badges[badgeIndex].issuer.filter(user => user._id !== userId);
      dispatch({
        type: DECLINE_ISSUER,
        payload: badges
      });
      dispatch(returnSuccess(res.data.message, res.status, 'DECLINE_ISSUER_SUCCESS'));
    },
    error: err => {
      if(err.response){
        if(err.response.status === 400){
          var badges = getState().badge.badges;
          const badgeIndex = badges.map(badge => badge._id).indexOf(badgeId);
          badges[badgeIndex].request = badges[badgeIndex].request.filter(user => user._id !== userId);
          dispatch({
            type: DECLINE_ISSUER,
            payload: badges
          });
          dispatch(returnSuccess(err.response.data.message, err.response.status, 'DECLINE_ISSUER_SUCCESS'));
        } else {
          dispatch(returnErrors(err.response.data.message, err.response.status, 'DECLINE_ISSUER_ERROR'));
        }
      }
    }
  };
  axios.put(`/api/v1/badge/${badgeId}/revoke/${userId}`, {}, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      if(err.response && err.response.status !== 401){
        err.config.error(err);
      }
    });
};


// request badge permission
export const requestBadgePermission = (badgeId) => (dispatch, getState) => {
  const config = {
    success: res => {
      var badges = getState().badge.badges;
      const badgeIndex = badges.map(badge => badge._id).indexOf(badgeId);
      const user = getState().auth.user;
      badges[badgeIndex].request.push({_id: user._id, firstname: user.firstname, lastname: user.lastname});
      dispatch({
        type: REQUEST_BADGE_PERMISSION,
        payload: badges
      });
      dispatch(returnSuccess(res.data.message, res.status, 'REQUEST_BADGE_PERMISSION_SUCCESS'));
    },
    error: err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'REQUEST_BADGE_PERMISSION_ERROR'));
      }
    }
  };
  axios.put(`/api/v1/badge/${badgeId}/request`, {}, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      if(err.response && err.response.status !== 401){
        err.config.error(err);
      }
    });
};
