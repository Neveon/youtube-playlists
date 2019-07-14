import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PlaylistItemPage from '../components/layout/PlaylistItemPage';

// Auth
import AuthRoute from './AuthRoute';

// Redux
import { connect } from 'react-redux';

const Routes = ({ playlist: { allPlaylists } }) => {
  let playlistRoutes;
  if (allPlaylists !== null) {
    playlistRoutes = allPlaylists.map(playlist => (
      <Route
        key={playlist.name}
        exact
        path={`/${playlist.name}`}
        component={PlaylistItemPage}
      />
    ));
  } else {
    playlistRoutes = null;
  }

  return (
    <Router>
      <div className='container'>
        <Switch>
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/signup' component={Signup} />
          {playlistRoutes}
        </Switch>
      </div>
    </Router>
  );
};

Routes.propTypes = {
  playlist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  playlist: state.playlist
});

export default connect(mapStateToProps)(Routes);
