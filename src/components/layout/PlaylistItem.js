import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePlaylist } from '../../redux/actions/playlistActions';

const PlaylistItem = ({ playlistPassed, deletePlaylist, user }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    if (user.authenticated !== authenticated) {
      setAuthenticated(user.authenticated);
    }
    if (credentials !== user.credentials) {
      setCredentials(user.credentials);
    }
  }, [authenticated, credentials, user.credentials, user.authenticated]);

  const onDelete = () => {
    let name = playlistPassed.name;
    deletePlaylist(name);
  };

  dayjs.extend(relativeTime);
  return (
    <div>
      <li className='collection-item'>
        <div className='row m-0'>
          &#9833;{' '}
          <Link to={`/playlist/${playlistPassed.name}`}>
            {playlistPassed.name}
          </Link>
          &nbsp;&nbsp;
          <span className='black-text'>
            {playlistPassed.list.length} Videos
          </span>
          {authenticated && credentials.userId === playlistPassed.userId ? (
            <a href='#!' onClick={onDelete} className='secondary-content'>
              <i className='material-icons red-text'>remove_circle</i>
            </a>
          ) : null}
        </div>
        <div className='row m-0'>
          <span className='grey-text'>
            <small>Created {dayjs(playlistPassed.createdAt).fromNow()}</small>
          </span>
        </div>
      </li>
    </div>
  );
};

PlaylistItem.propTypes = {
  deletePlaylist: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { deletePlaylist }
)(PlaylistItem);
