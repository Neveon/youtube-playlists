import React, { useEffect } from 'react';
import Preloader from '../components/layout/Preloader';
import PlaylistItem from '../components/layout/PlaylistItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlaylists } from '../redux/actions/playlistActions';

// Layout
import AddPlaylistBtn from '../components/layout/AddPlaylistBtn';

import M from 'materialize-css/dist/js/materialize.min.js';

const Home = ({ playlist: { allPlaylists }, getPlaylists, history }) => {
  useEffect(() => {
    M.AutoInit();
    // If token exists then get playlists, otherwise route user to login
    if (localStorage.getItem('FBIdtoken')) {
      getPlaylists();
    } else {
      M.toast({ html: 'Please login' });
      localStorage.clear();
      history.push('/login');
    }
    // eslint-disable-next-line
  }, []);

  if (allPlaylists === null) {
    // init null
    return <Preloader />;
  }

  return (
    <div>
      <ul className='collection with-header'>
        <li className='collection-header'>
          <h4 className='center'>&#9835; Your Playlists &#9835;</h4>
        </li>
        {allPlaylists.map(playlist => (
          <PlaylistItem playlistPassed={playlist} key={playlist.name} />
        ))}
      </ul>
      {allPlaylists.length === 0 ? (
        <div>
          <h5>
            No playlists found :{'('} <br />
          </h5>
          <br />
        </div>
      ) : null}
      <AddPlaylistBtn />
    </div>
  );
};

Home.propTypes = {
  playlist: PropTypes.object.isRequired,
  getPlaylists: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  playlist: state.playlist
});

export default connect(
  mapStateToProps,
  { getPlaylists }
)(Home);
