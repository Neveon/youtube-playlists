import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactYoutube from './ReactYoutube';
import { Link } from 'react-router-dom';

import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';

const PlaylistItemPage = ({ current }) => {
  useEffect(() => {
    M.AutoInit();
  }, [current.list]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='left-align'>
          <p>
            'URL'+vidID anchor tags{' '}
            <i className='material-icons left'>format_list_numbered</i>
          </p>
        </div>
        <div className='right-align'>
          <a className='waves-effect waves-light btn' href='#!'>
            Logout<i className='material-icons left'>backspace</i>
          </a>
        </div>
      </div>
      <div className='row'>
        <h2 className='center-align' id='currentPlaylistTitle'>
          &#9835; {current.name} Playlist &#9835;
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

      <div className='row'>
        <div className='col s6 center-align'>
          <a
            href='#!'
            className='waves-effect waves-light btn green accent-4 black-text'
          >
            <b className='btnTitle' id='btnTitleAdd'>
              Add Video to Playlist
            </b>
            <i className='material-icons right'>add</i>
          </a>
        </div>
        <div className='col s6 center-align'>
          <a
            href='#!'
            className='waves-effect waves-light btn red accent-2 black-text'
          >
            <b className='btnTitle' id='btnTitleRemove'>
              Remove Video from Playlist
            </b>
            <i className='material-icons right'>remove</i>
          </a>
        </div>
      </div>
      <div className='center-align'>
        <ReactYoutube />
      </div>
      <div className='row'>
        <div className='col s12 center-align'>
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
        </div>
      </div>
    </div>
  );
};

PlaylistItemPage.propTypes = {
  current: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  current: state.playlist.current
});

export default connect(mapStateToProps)(PlaylistItemPage);
