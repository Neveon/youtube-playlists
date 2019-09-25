import React, { useEffect, useState } from 'react';
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
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    M.AutoInit();

    if (localStorage.getItem('FBIdtoken')) {
      getUserData();
    }

    // Get all playlists from server
    getAllPlaylists();

    // Sets base url
    setBaseUrl('/explore');

    //eslint-disable-next-line
  }, []);

  const OnChangeSearch = e => {
    setSearchText(e.target.value);
  };

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
              <h4 className='center'>&#9835; Explore All Playlists &#9835;</h4>
            </li>
            <Preloader />
          </ul>
        </div>
      </div>
    );
  } else if (searchText === '') {
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
