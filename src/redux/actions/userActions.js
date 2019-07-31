import { SET_UNAUTHENTICATED, SET_AUTHENTICATED, SET_BASE_URL } from '../types';
import axios from 'axios';

import M from 'materialize-css/dist/js/materialize.min.js';

export const setBaseUrl = url => dispatch => {
  dispatch({
    type: SET_BASE_URL,
    payload: url
  });
};

export const getUserData = () => dispatch => {
  axios
    .get('/user')
    .then(res => {
      dispatch({
        type: SET_AUTHENTICATED,
        payload: res.data.credentials
      });
    })
    .catch(() => {
      dispatch({
        type: SET_UNAUTHENTICATED
      });
    });
};

export const notAuthenticated = () => dispatch => {
  dispatch({
    type: SET_UNAUTHENTICATED
  });
};

export const loginUser = (userData, history) => dispatch => {
  axios
    .post('/login', userData)
    .then(res => {
      const FBIdToken = `Bearer ${res.data.token}`; // FBAuth response
      localStorage.setItem('FBIdtoken', FBIdToken);
      axios.defaults.headers.common['Authorization'] = FBIdToken;
      M.toast({ html: 'Login Successful' });
      history.push('/');
    })
    .catch(err => {
      dispatch({ type: SET_UNAUTHENTICATED });
      if (err.response.data.email) {
        M.toast({ html: `Email ${err.response.data.email}` });
      }
      if (err.response.data.password) {
        M.toast({ html: `Password ${err.response.data.password}` });
      }
      if (err.response.data.general) {
        M.toast({ html: 'Wrong Credentials' });
      }
    });
};

export const logoutUser = () => dispatch => {
  localStorage.clear();
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const signupUser = (userData, history) => dispatch => {
  axios
    .post('/signup', userData)
    .then(res => {
      const FBIdToken = `Bearer ${res.data.token}`; // token in res
      localStorage.setItem('FBIdtoken', FBIdToken);
      axios.defaults.headers.common['Authorization'] = FBIdToken;
      M.toast({ html: 'Sign up Successful' });
      history.push('/');
    })
    .catch(err => {
      dispatch({ type: SET_UNAUTHENTICATED });
      if (err.response.data.email) {
        M.toast({ html: `Email: ${err.response.data.email}` });
      }
      if (err.response.data.password) {
        M.toast({ html: `Password: ${err.response.data.password}` });
      }
      if (err.response.data.confirmPassword) {
        M.toast({
          html: `Confirm Password: ${err.response.data.confirmPassword}`
        });
      }
      if (err.response.data.username) {
        M.toast({ html: `Username: ${err.response.data.username}` });
      }
    });
};
