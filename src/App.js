import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// CSS and Materialize
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Components
import AuthRoute from './util/AuthRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Checking for token in localStorage
let authenticated;
const token = localStorage.FBIdtoken;

if (token) {
  const decodedToken = jwtDecode(token);
  // token expires * 1000 for expire date - if expired (< today's date)
  if (decodedToken.exp * 1000 < Date.now()) {
    // redirect to login when token expires
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });

  return (
    <Provider store={store}>
      <div>
        <Router>
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <AuthRoute
                exact
                path='/login'
                component={Login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path='/signup'
                component={Signup}
                authenticated={authenticated}
              />
            </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
