import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addVideo } from '../../redux/actions/playlistActions';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddPlaylistBtn = ({ addVideo, current }) => {
  const [playlistName, setPlaylistName] = useState('');
  const [videoID, setVideoID] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    M.AutoInit();
    setPlaylistName(current.name);
  }, []);

  const handleChange = e => {
    setVideoID(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    if (videoID.trim() === '') {
      M.toast({ html: 'Please enter a video ID' });
    } else if (videoID.split(' ').length > 1) {
      M.toast({ html: 'Please enter a videoID with no whitespace' });
    } else {
      addVideo(playlistName, videoID);
    }
    setLoading(false);
    setVideoID('');
  };

  return (
    <div>
      <a
        href='#add-video-modal'
        className='waves-effect waves-light btn green accent-4 black-text'
      >
        <b className='btnTitle' id='btnTitleAdd'>
          Add Video to Playlist
        </b>
        <i className='material-icons right'>add</i>
      </a>
      <form onSubmit={handleSubmit}>
        <div className='modal' id='add-video-modal'>
          <div className='modal-content'>
            <h4>Add a Video to {current.name}</h4>
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
                Add Video
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
  addVideo: PropTypes.func.isRequired,
  current: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  current: state.playlist.current
});

export default connect(
  mapStateToProps,
  { addVideo }
)(AddPlaylistBtn);
