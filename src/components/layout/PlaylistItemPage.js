import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';

const PlaylistItemPage = ({ current }) => {
  const [video, setVideo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    M.AutoInit();
  }, []);

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
      <p>Hello {current.name}</p>
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
