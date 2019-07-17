import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import VideoItem from './VideoItem';

import M from 'materialize-css/dist/js/materialize.min.js';

const RemoveVideoBtn = ({ playlist: { list, name } }) => {
  const playlistName = name;
  //console.log(list);

  useEffect(() => {
    M.AutoInit();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <a
        href='#remove-video-modal'
        className='waves-effect waves-light btn red accent-2 black-text modal-trigger'
      >
        <b className='btnTitle' id='btnTitleRemove'>
          {playlistName} Video List
        </b>
        <i className='material-icons right'>view_list</i>
      </a>

      <div className='modal' id='remove-video-modal'>
        <div className='modal-content'>
          <ul className='collection with-header'>
            <li className='collection-header'>
              <h4>{playlistName} Video List</h4>
            </li>
            {list.map(videoid => (
              <VideoItem key={videoid} videoid={videoid} />
            ))}
          </ul>
        </div>
        <div className='modal-footer'>
          <a
            href='#!'
            className='modal-close waves-effect waves-green btn-flat'
          >
            Close
          </a>
        </div>
      </div>
    </div>
  );
};

RemoveVideoBtn.propTypes = {
  playlist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  playlist: state.playlist.current[0]
});

export default connect(mapStateToProps)(RemoveVideoBtn);
