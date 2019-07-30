import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Explore from '../pages/Explore';
import PlaylistItemPage from '../components/PlaylistItemPage';

// Auth
import AuthRoute from './AuthRoute';

const Routes = () => {
  return (
    <Router>
      <div className='container'>
        <Switch>
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/signup' component={Signup} />
          <Route exact path='/explore' component={Explore} />
          <Route
            exact
            path='/playlist/:playlist'
            component={PlaylistItemPage}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
