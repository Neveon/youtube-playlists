import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import M from 'materialize-css/dist/js/materialize.min.js';

const PlaylistItem = ({ playlist }) => {
  const onDelete = () => {
    // axios.delete req.body.name = playlist.name
    M.toast({ html: 'Playlist deleted' });
  };

  dayjs.extend(relativeTime);
  return (
    <li className='collection-item'>
      <div>
        <a href='#edit-playlist-modal' className='modal-trigger'>
          {playlist.name}
        </a>
        <br />
        <span className='grey-text'>
          <span className='black-text'>
            Created {dayjs(playlist.createdAt).fromNow()}
          </span>
        </span>
        <a href='#!' onClick={onDelete} className='secondary-content'>
          <i className='material-icons grey-text'>delete</i>
        </a>
      </div>
    </li>
  );
};

export default PlaylistItem;
