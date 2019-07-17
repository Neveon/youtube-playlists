import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeVideo } from '../../redux/actions/playlistActions';

import M from 'materialize-css/dist/js/materialize.min.js';

const VideoItem = ({ videoid, removeVideo, playlist: { list, name } }) => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const onDelete = () => {
    if (list.length === 1) {
      M.toast({
        html: 'List cannot be empty, add another video then remove this one'
      });
    } else if (list.length > 1) {
      removeVideo(name, videoid);
    }
  };

  return (
    <li className='collection-item' key={videoid}>
      <a
        href={`https://www.youtube.com/watch?v=${videoid}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        {'https://www.youtube.com/watch?v='}
        <b>{videoid}</b>
      </a>
      <a href='#!' className='secondary-content' onClick={onDelete}>
        <i className='material-icons red-text'>remove_circle</i>
      </a>
    </li>
  );
};

VideoItem.propTypes = {
  removeVideo: PropTypes.func.isRequired,
  playlist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  playlist: state.playlist.current[0]
});

export default connect(
  mapStateToProps,
  { removeVideo }
)(VideoItem);
