import React, { useState } from 'react';

import M from 'materialize-css/dist/js/materialize.min.js';

const AddVideoModal = () => {
  const [video, setVideo] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = e => {
    setVideo(e.target.value);
  };

  const onSubmit = async () => {
    if (video.trim() === '') {
      // if nothing submitted
      M.toast({ html: 'Please enter a valid videoID' });
    } else {
      setLoading(true);

      const res = await fetch('/playlists', {
        method: 'POST',
        body: JSON.stringify(video),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setLoading(false);
    }

    setVideo('');
  };

  return (
    <div>
      <div id='modal' className='modal bottom-sheet'>
        <div className='modal-content'>
          <h4>Add a Video to your Playlist</h4>
          <div className='input-field'>
            <input
              type='text'
              className='validate'
              id='videoid'
              value={video}
              onChange={onChange}
            />
            <label htmlFor='videoid'>Enter YouTube Video ID</label>
          </div>
        </div>
        <div className='modal-footer'>
          <a href='#!' className='modal-close'>
            <button
              className='btn waves-effect waves-light'
              type='submit'
              name='action'
              disabled={loading}
            >
              Add Video
              <i className='material-icons right'>send</i>
            </button>
          </a>
          <a href='#!' className='modal-close btn-flat'>
            Close
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddVideoModal;
