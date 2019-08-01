import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactYoutube from './ReactYoutube';
import { Link } from 'react-router-dom';

// Redux
import { setCurrentPlaylist } from '../redux/actions/playlistActions';
import { getUserData, notAuthenticated } from '../redux/actions/userActions';

// Layout
import AddVideoBtn from './layout/AddVideoBtn';
import RemoveVideoBtn from './layout/RemoveVideoBtn';
import LogoutBtn from './layout/LogoutBtn';
import Preloader from './layout/Preloader';

// Image
import Logo from '../assets/logo.png';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

class PlaylistItemPage extends Component {
  componentDidMount() {
    M.AutoInit();

    if (localStorage.getItem('FBIdtoken')) {
      this.props.getUserData(); // gets logged in user id & username
    } else {
      this.props.notAuthenticated();
    }

    // Set current playlist
    const playlistName = this.props.match.params.playlist;
    this.props.setCurrentPlaylist(playlistName);
  }

  render() {
    const { authenticated, credentials, loading, baseUrl } = this.props.user;

    if (loading || this.props.current[0] === undefined) {
      return <Preloader />;
    } else {
      const { name, userId } = this.props.current[0];
      return (
        <div className='container'>
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
          <div id='ifnav' className='row'>
            <h2 className='center-align' id='currentPlaylistTitle'>
              &#9835; {name} Playlist &#9835;
            </h2>
            <div className='note-position-1 note-animation'>&#9835;</div>
            <div className='note-position-2 note-animation animation-delay-2'>
              &#9833;
            </div>
            <div className='note-position-3 note-animation animation-delay-1'>
              &#9839;
            </div>
            <div className='note-position-4 note-animation'>&#9834;</div>
            <div className='note-position-5 note-animation'>&#9835;</div>
            <div className='note-position-6 note-animation animation-delay-2'>
              &#9833;
            </div>
            <div className='note-position-7 note-animation animation-delay-1'>
              &#9839;
            </div>
            <div className='note-position-8 note-animation'>&#9834;</div>
          </div>
          <br />

          {!authenticated ? (
            <div className='row'>
              <p className='center-align'>
                Enjoy the site? Consider signing up!
              </p>
            </div>
          ) : userId === credentials.userId ? (
            <div className='row'>
              <div className='col s6 center-align'>
                <AddVideoBtn />
              </div>
              <div className='col s6 center-align'>
                <RemoveVideoBtn />
              </div>
            </div>
          ) : null}
          <div className='center-align'>
            <ReactYoutube />
            <br />
            <br />
            <br />
          </div>
          <div className='row'>
            <div className='col s12 center-align'>
              {baseUrl !== '/' ? (
                <Link
                  to='/explore'
                  id='backBtn'
                  className='btn blue lighten-2 black-text'
                >
                  <b>Explore Playlists</b>
                </Link>
              ) : baseUrl === '/' ? (
                <Fragment>
                  <Link
                    to='/'
                    id='backBtn'
                    className='btn blue-grey darken-2 white-text'
                  >
                    <i className='material-icons left'>arrow_back</i>
                    <b className='btnTitle' id='btnTitleBack'>
                      Back to Your Playlists
                    </b>
                  </Link>
                </Fragment>
              ) : (
                <Link
                  to='/explore'
                  id='backBtn'
                  className='btn blue lighten-2 black-text'
                >
                  <i className='material-icons left'>arrow_back</i>
                  <b>Explore Playlists</b>
                </Link>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

PlaylistItemPage.propTypes = {
  current: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  setCurrentPlaylist: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired,
  notAuthenticated: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current: state.playlist.current,
  user: state.user
});

const mapDispatchToProps = {
  setCurrentPlaylist,
  getUserData,
  notAuthenticated
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistItemPage);
