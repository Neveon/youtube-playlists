import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Layout
import Preloader from '../components/layout/Preloader';
import PlaylistItem from '../components/layout/PlaylistItem';
import LogoutBtn from '../components/layout/LogoutBtn';

// Redux
import { connect } from 'react-redux';
import { getAllPlaylists } from '../redux/actions/playlistActions';
import { setBaseUrl, getUserData } from '../redux/actions/userActions';

// Image
import Logo from '../assets/logo.png';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const Explore = ({
  allPlaylists,
  getAllPlaylists,
  authenticated,
  setBaseUrl,
  loading,
  getUserData
}) => {
  useEffect(() => {
    M.AutoInit();

    if (localStorage.getItem('FBIdtoken')) {
      getUserData();
    }

    // Sets base url
    setBaseUrl('/explore');

    // Get all playlists from server
    getAllPlaylists();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    // init null, loading screen
    return (
      <div>
        {authenticated ? (
          <nav>
            <div className='nav-wrapper'>
              <Link to='/'>
                <img src={Logo} alt='Playlist Logo' />
              </Link>
              <ul id='nav-mobile' className='right'>
                <li>
                  <LogoutBtn />
                </li>
              </ul>
            </div>
          </nav>
        ) : (
          <nav>
            <div className='nav-wrapper'>
              <Link to='/'>
                <img src={Logo} alt='Playlist Logo' />
              </Link>
            </div>
          </nav>
        )}
        <ul className='collection with-header' id='ifnav'>
          <li className='collection-header'>
            <h4 className='center'>&#9835; Explore All Playlists &#9835;</h4>
          </li>
          <Preloader />
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        {authenticated ? (
          <nav>
            <div className='nav-wrapper'>
              <Link to='/'>
                <img src={Logo} alt='Playlist Logo' />
              </Link>
              <ul id='nav-mobile' className='right'>
                <li>
                  <LogoutBtn />
                </li>
              </ul>
            </div>
          </nav>
        ) : (
          <nav>
            <div className='nav-wrapper'>
              <Link to='/'>
                <img src={Logo} alt='Playlist Logo' />
              </Link>
              <ul id='nav-mobile' className='right'>
                <li>
                  <Link to='/login'>
                    <i className='material-icons'>person</i>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to='/signup'>
                    <i className='material-icons'>person_add</i>
                    Signup
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        )}
        <ul className='collection with-header' id='ifnav'>
          <li className='collection-header'>
            <h4 className='center' id='ExplorePageTitle'>
              &#9835;{' '}
              <i className='material-icons black-text ExplorePageIcon'>
                explore
              </i>{' '}
              Explore All Playlists{' '}
              <i className='material-icons black-text ExplorePageIcon'>
                explore
              </i>{' '}
              &#9835;
            </h4>
          </li>
          {allPlaylists.map(playlist => (
            <PlaylistItem playlistPassed={playlist} key={playlist.name} />
          ))}
        </ul>
      </div>
    );
  }
};

Explore.propTypes = {
  getAllPlaylists: PropTypes.func.isRequired,
  allPlaylists: PropTypes.array.isRequired,
  setBaseUrl: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  getUserData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  allPlaylists: state.playlist.allPlaylists,
  authenticated: state.user.authenticated,
  loading: state.user.loading
});

const mapDispatchToProps = { getAllPlaylists, setBaseUrl, getUserData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);
