import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getPlaylists } from '../redux/actions/playlistActions';
import {
  getUserData,
  setBaseUrl,
  notAuthenticated
} from '../redux/actions/userActions';

// Layout
import AddPlaylistBtn from '../components/layout/AddPlaylistBtn';
import LogoutBtn from '../components/layout/LogoutBtn';
import Preloader from '../components/layout/Preloader';
import PlaylistItem from '../components/layout/PlaylistItem';

// Images
import Logo from '../assets/logo.png';

import M from 'materialize-css/dist/js/materialize.min.js';

const Home = ({
  allPlaylists,
  getPlaylists,
  history,
  user,
  getUserData,
  setBaseUrl,
  notAuthenticated
}) => {
  useEffect(() => {
    M.AutoInit();
    // If token exists then get playlists, otherwise route user to login
    if (localStorage.getItem('FBIdtoken')) {
      getUserData(); // gets logged user id & username
      setBaseUrl('/'); // Sets base url
      getPlaylists(); // get user playlists
    } else {
      notAuthenticated();
      M.toast({ html: 'Please login' });
      localStorage.clear();
      history.push('/login');
    }
    // eslint-disable-next-line
  }, []);

  if (user.loading) {
    return (
      <div>
        <nav>
          <div className='nav-wrapper'>
            <Link to='/'>
              <img src={Logo} alt='Playlist Logo' />
            </Link>
            <ul id='nav-mobile' className='right'>
              <li>
                <Link to='/explore'>
                  <i className='material-icons'>explore</i>
                </Link>
              </li>
              <li>
                <LogoutBtn />
              </li>
            </ul>
          </div>
        </nav>
        <ul className='collection with-header' id='ifnav'>
          <li className='collection-header'>
            <h4 className='center'>&#9835; Your Playlists &#9835;</h4>
          </li>
          <br />
          <Preloader />
          <br />
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <nav>
          <div className='nav-wrapper'>
            <Link to='/'>
              <img src={Logo} alt='Playlist Logo' />
            </Link>
            <ul id='nav-mobile' className='right'>
              <li id='exploreLink'>
                <Link to='/explore'>
                  <i className='material-icons'>explore</i>
                </Link>
              </li>
              <li>
                <LogoutBtn />
              </li>
            </ul>
          </div>
        </nav>
        <ul className='collection with-header' id='ifnav'>
          <li className='collection-header'>
            <h4 className='center'>&#9835; Your Playlists &#9835;</h4>
          </li>
          {allPlaylists.map(playlist => (
            <PlaylistItem playlistPassed={playlist} key={playlist.name} />
          ))}
        </ul>
        <AddPlaylistBtn />
      </div>
    );
  }
};

Home.propTypes = {
  getPlaylists: PropTypes.func.isRequired,
  allPlaylists: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
  setBaseUrl: PropTypes.func.isRequired,
  notAuthenticated: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  allPlaylists: state.playlist.allPlaylists,
  user: state.user
});

const mapDispatchToProps = {
  getPlaylists,
  getUserData,
  setBaseUrl,
  notAuthenticated
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
