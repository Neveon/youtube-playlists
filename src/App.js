import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// CSS and Materialize
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser } from './redux/actions/userActions';

// Routes
import Routes from './util/Routes';

// Checking for token in localStorage
const token = localStorage.getItem('FBIdtoken');

if (token) {
  const decodedToken = jwtDecode(token);
  // token expires * 1000 for expire date - if expired (< today's date)
  if (decodedToken.exp * 1000 < Date.now()) {
    // redirect to login when token expires
    M.toast({ html: 'Session ended, please login' });
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
  }
}

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  }, []);

  return (
    <Provider store={store}>
      <div>
        <Routes />
      </div>
    </Provider>
  );
};

export default App;
