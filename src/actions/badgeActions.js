import { GET_BADGES, ADD_BADGE, BADGES_LOADING } from './types';

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
