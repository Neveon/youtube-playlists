import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PlaylistItemPage from '../components/PlaylistItemPage';

// Auth
import AuthRoute from './AuthRoute';

// Redux
import { connect } from 'react-redux';

const Routes = ({ allPlaylists }) => {
  return (
    <Router>
      <div className='container'>
        <Switch>
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/signup' component={Signup} />
          {allPlaylists !== null
            ? allPlaylists.map(playlist => (
                <Route
                  key={playlist.name}
                  exact
                  path={`/${playlist.name}`}
                  component={PlaylistItemPage}
                />
              ))
            : null}
        </Switch>
      </div>
    </Router>
  );
};

Routes.propTypes = {
  allPlaylists: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  allPlaylists: state.playlist.allPlaylists
});

export default connect(mapStateToProps)(Routes);
