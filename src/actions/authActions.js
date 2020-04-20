import axios from 'axios';
import { returnErrors, returnSuccess } from './messageActions'

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REFRESH_TOKEN_FAIL,
  REFRESH_TOKEN_SUCCESS
} from '../actions/types';


// Check token & load user
export const loadUser = () => (dispatch) => {
  // user loading
  dispatch({
    type: USER_LOADING
  });
  axios.get('api/v1/user/me', dispatch(authInterceptor()))
    .then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status));
      }
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = ({ firstname, lastname, city, postalcode, birthday, email, username, password, confirmPassword }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request Body
  const body = JSON.stringify({ firstname, lastname, city, postalcode, birthday, email, username, password, confirmPassword });
  axios.post('api/v1/user/signup', body, config)
    .then(res => {
      dispatch(returnSuccess(res.data.message, res.status, 'REGISTER_SUCCESS'));
      dispatch({
        type: REGISTER_SUCCESS
      })
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data.message, err.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};


var logoutTimerId;

// Login user
export const login = ({ username, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request Body
  const body = JSON.stringify({ username, password });
  axios.post('api/v1/user/signin', body, config)
  .then(res => {
    // Logout automatically if refreshToken "expired"
    const logoutTimer = () => setTimeout(
      () => dispatch(logout()),
      5*60*1000
    );
    logoutTimerId = logoutTimer();
    dispatch(returnSuccess(res.data.message, res.status, 'LOGIN_SUCCESS'));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  })
  .catch(err => {
    dispatch(returnErrors(err.response.data.message, err.response.status, 'LOGIN_FAIL'));
    dispatch({
      type: LOGIN_FAIL
    });
  });
};


// Logout User
export const logout = () => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios.post('api/v1/user/signout', config)
  .then(res => {
    dispatch({
      type: LOGOUT_SUCCESS
    });
    clearTimeout(logoutTimerId);
  })
  .catch(err => {
    dispatch(returnErrors(err.response.data.message, err.response.status, 'LOGIN_FAIL'));
    dispatch({
      type: LOGOUT_FAIL
    });
    clearTimeout(logoutTimerId);
  });
};


export const authInterceptor = () => (dispatch, getState) => {
  // Add a request interceptor
  axios.interceptors.request.use(
    config => {
      config.headers['Content-Type'] = 'application/json';
      const token = getState().auth.token;
      if (token) {
       config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
   },
   error => {
     Promise.reject(error);
   }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    response => {
      // request was successfull
      return response;
    },
    error => {
      const originalRequest = error.config;
      const refreshToken = getState().auth.refreshToken;
      if(refreshToken){
        // try to refresh the token failed
        if (error.response.status === 401 &&
            originalRequest.url === 'api/v1/user/token/refresh') {
              // router.push('/login');
              return Promise.reject(error);
        }
        // token was not valid and 1st try to refresh the token
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = getState().auth.refreshToken;
          // request to refresh the token, in request-body is the refreshToken
          axios.post('api/v1/user/token/refresh', {"refreshToken": refreshToken})
               .then(res => {
                 if (res.status === 201) {
                   dispatch({
                     type: REFRESH_TOKEN_SUCCESS,
                     payload: res.data
                   });
                   axios.defaults.headers.common['Authorization'] = 'Bearer ' + getState().auth.token;
                   // request was successfull, new request with the old parameters and the refreshed token
                   return axios(originalRequest);
                 }
                 return Promise.reject(error);
               })
               .catch(err => {
                 // request failed, token could not be refreshed
                 dispatch(returnErrors(err.response.data, err.response.status, 'REFRESH_TOKEN_FAIL'));
                 dispatch({
                   type: REFRESH_TOKEN_FAIL
                 });
                 return Promise.reject(error);
               });
        }
      }
      // request status was unequal to 401, no possibility to refresh the token
      return Promise.reject(error);
    }
  );
};
