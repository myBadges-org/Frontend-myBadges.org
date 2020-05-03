import { GET_BADGES, ADD_BADGE } from './types';

import axios from 'axios';
import { returnErrors, returnSuccess } from './messageActions'

// get badges from API
export const getBadges = () => (dispatch) => {
  axios.get('/api/v1/badge')
    .then(res => dispatch({
        type: GET_BADGES,
        payload: res.data.badges
      })
    )
    .catch(err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'GET_BADGES_FAIL'));
      }
    });
};

// add badge to API
export const addBadge = (newBadge) => (dispatch, getState) => {
  axios.post('/api/v1/badge', newBadge)
    .then(res => {
      var badges = getState().badge.badges;
      badges.push(res.data.badge);
      dispatch(returnErrors(res.data.message, res.status, 'ADD_BADGE_SUCCESS'));
      dispatch({
        type: ADD_BADGE,
        payload: badges
      });
    })
    .catch(err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'ADD_BADGE_FAIL'));
      }
    });
};
