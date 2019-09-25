import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getPlaylists } from '../redux/actions/playlistActions';
import {
  getUserData,
  setBaseUrl,
  logoutUser
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
  logoutUser
}) => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    M.AutoInit();
    // If token exists then get playlists, otherwise route user to login
    if (localStorage.getItem('FBIdtoken')) {
      getUserData(); // gets logged user id & username
      setBaseUrl('/'); // Sets base url
      getPlaylists(); // get user playlists
    } else {
      M.toast({
        html: 'Please login to see your playlists or explore other playlists'
      });
      logoutUser();
      history.push('/login');
    }
    // eslint-disable-next-line
  }, []);

  const OnChangeSearch = e => {
    setSearchText(e.target.value);
  };

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
                <LogoutBtn atHome={true} />
              </li>
            </ul>
          </div>
        </nav>
        <div className='col' id='ifnav'>
          <div className='center search input-field'>
            <input
              type='text'
              id='search-input'
              className='validate'
              onChange={OnChangeSearch}
            />
            <label htmlFor='search-input'>Search</label>
          </div>
          <ul className='collection with-header' id='ifnav'>
            <li className='collection-header'>
              <h4 className='center'>&#9835; Your Playlists &#9835;</h4>
            </li>
            <br />
            <Preloader />
            <br />
          </ul>
        </div>
      </div>
    );
  } else if (searchText === '') {
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
                <LogoutBtn atHome={true} />
              </li>
            </ul>
          </div>
        </nav>
        <div className='col' id='ifnav'>
          <div className='center search input-field'>
            <input
              type='text'
              id='search-input'
              className='validate'
              onChange={OnChangeSearch}
            />
            <label htmlFor='search-input'>Search</label>
          </div>
          <ul className='collection with-header' id='ifnav'>
            <li className='collection-header'>
              <h4 className='center'>&#9835; Your Playlists &#9835;</h4>
            </li>
            {allPlaylists.map(playlist => (
              <PlaylistItem playlistPassed={playlist} key={playlist.name} />
            ))}
          </ul>
        </div>
        <AddPlaylistBtn />
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
                <LogoutBtn atHome={true} />
              </li>
            </ul>
          </div>
        </nav>
        <div className='col' id='ifnav'>
          <div className='center search input-field'>
            <input
              type='text'
              id='search-input'
              className='validate'
              onChange={OnChangeSearch}
            />
            <label htmlFor='search-input'>Search</label>
          </div>
          <ul className='collection with-header' id='ifnav'>
            <li className='collection-header'>
              <h4 className='center'>&#9835; Your Playlists &#9835;</h4>
            </li>
            {allPlaylists
              .filter(playlist => {
                if (
                  playlist.name
                    .toLowerCase()
                    .indexOf(searchText.toLowerCase()) > -1
                ) {
                  return true;
                } else {
                  return false;
                }
              })
              .map(playlist => {
                return (
                  <PlaylistItem playlistPassed={playlist} key={playlist.name} />
                );
              })}
          </ul>
        </div>
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
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  allPlaylists: state.playlist.allPlaylists,
  user: state.user
});

const mapDispatchToProps = {
  getPlaylists,
  getUserData,
  setBaseUrl,
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
