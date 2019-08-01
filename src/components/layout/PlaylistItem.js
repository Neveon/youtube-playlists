import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePlaylist } from '../../redux/actions/playlistActions';

import M from 'materialize-css/dist/js/materialize.min.js';

const PlaylistItem = ({ playlistPassed, deletePlaylist, user }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    M.AutoInit();

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
            <Fragment>
              <a
                href='#warningmodal'
                className='modal-trigger secondary-content'
              >
                <i className='material-icons red-text'>remove_circle</i>
              </a>
              <div className='modal' id='warningmodal'>
                <div className='modal-content'>
                  <h4>Delete Playlist?</h4>
                  <p className='red-text'>
                    <br />
                    <b>This cannot be undone</b>
                  </p>
                  <div className='modal-footer'>
                    <a href='#!' className='modal-close btn-flat'>
                      Cancel
                    </a>
                    <a
                      href='#!'
                      onClick={onDelete}
                      className='modal-close waves-red red accent-4 btn'
                    >
                      <b>DELETE</b>
                    </a>
                  </div>
                </div>
              </div>
            </Fragment>
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
