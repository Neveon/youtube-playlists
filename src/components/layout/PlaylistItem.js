import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deletePlaylist,
  setCurrentPlaylist
} from '../../redux/actions/playlistActions';

const PlaylistItem = ({
  playlistPassed,
  deletePlaylist,
  setCurrentPlaylist
}) => {
  const setCurrent = () => {
    // Current used in PlaylistItemPage
    setCurrentPlaylist(playlistPassed);
  };

  const onDelete = () => {
    let name = playlistPassed.name;
    deletePlaylist(name);
  };

  dayjs.extend(relativeTime);
  return (
    <div>
      <li className='collection-item'>
        <div>
          &#9833;{' '}
          <Link to={`/${playlistPassed.name}`} onClick={setCurrent}>
            {playlistPassed.name}
          </Link>
          &nbsp;&nbsp;
          <span className='grey-text'>
            <small>Created {dayjs(playlistPassed.createdAt).fromNow()}</small>
          </span>
          <a href='#!' onClick={onDelete} className='secondary-content'>
            <i className='material-icons red-text'>remove_circle</i>
          </a>
        </div>
      </li>
    </div>
  );
};

PlaylistItem.propTypes = {
  deletePlaylist: PropTypes.func.isRequired,
  setCurrentPlaylist: PropTypes.func.isRequired
};

export default connect(
  null,
  { deletePlaylist, setCurrentPlaylist }
)(PlaylistItem);
