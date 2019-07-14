import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addPlaylist } from '../../redux/actions/playlistActions';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddPlaylistBtn = ({ addPlaylist }) => {
  const [playlistName, setPlaylistName] = useState('');
  const [videoID, setVideoID] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    M.AutoInit();
  }, []);

  const handleChange = e => {
    e.target.id === 'name'
      ? setPlaylistName(e.target.value)
      : setVideoID(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    if (videoID.trim() === '' || playlistName.trim() === '') {
      M.toast({ html: 'Please enter a playlist name and video ID' });
    } else if (videoID.split(' ').length > 1) {
      M.toast({ html: 'Please enter a videoID with no whitespace' });
    } else {
      addPlaylist(playlistName, videoID);
      M.toast({ html: `Added ${videoID}` });
    }
    setLoading(false);
  };

  return (
    <div>
      <div className='fixed-action-btn'>
        <a
          href='#add-playlist-modal'
          className='btn-floating btn-large green darken-3 modal-trigger'
        >
          <i className='large material-icons'>playlist_add</i>
        </a>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='modal' id='add-playlist-modal'>
          <div className='modal-content'>
            <h4>Add a Playlist</h4>
            <div className='input-field'>
              <input
                type='text'
                value={playlistName}
                id='name'
                className='validate'
                onChange={handleChange}
              />
              <label htmlFor='name'>Enter Playlist Name</label>
            </div>
            <div className='input-field'>
              <input
                type='text'
                id='videoID'
                value={videoID}
                className='validate'
                onChange={handleChange}
              />
              <label htmlFor='videoID'>
                Enter a Video ID to add to playlist
              </label>
            </div>
            <a href='https://docs.joeworkman.net/rapidweaver/stacks/youtube/video-id'>
              <small>Don't Know what a video ID is?</small>
            </a>
          </div>
          <div className='modal-footer'>
            <a href='#!' className='modal-close'>
              <button
                className='btn waves-effect waves-light'
                type='submit'
                disabled={loading}
              >
                Add Playlist
                <i className='material-icons right'>add_box</i>
              </button>
            </a>
            <a
              href='#!'
              className='modal-close waves-effect waves-green btn-flat'
            >
              Close
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

AddPlaylistBtn.propTypes = {
  addPlaylist: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPlaylist }
)(AddPlaylistBtn);
