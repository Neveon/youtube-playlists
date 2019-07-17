import {
  GET_PLAYLIST,
  ADD_PLAYLIST,
  REMOVE_PLAYLIST,
  SET_CURRENT,
  CLEAR_CURRENT,
  ADD_VIDEO,
  REMOVE_VIDEO
} from '../types';

import axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js';

// Get playlists from server
export const getPlaylists = () => dispatch => {
  try {
    const FBIdToken = localStorage.getItem('FBIdtoken');
    axios.defaults.headers.common['Authorization'] = FBIdToken;
    axios.get('/playlists').then(res => {
      dispatch({
        type: GET_PLAYLIST,
        payload: res.data
      });
    });
  } catch (err) {
    M.toast({ html: err.response.data });
    console.error(err.response.data);
  }
};

// Delete playlist from server
export const deletePlaylist = name => dispatch => {
  try {
    axios.delete(`/removePlaylist/${name}`).then(res => {
      M.toast({ html: res.data.message });
      dispatch({
        type: REMOVE_PLAYLIST,
        payload: name
      });
    });
  } catch (err) {
    M.toast({ html: err.response.data });
    console.error(err.response.data);
  }
};

export const addPlaylist = (name, video) => dispatch => {
  let playlist = {
    name: name,
    list: [video]
  };

  axios
    .put('/addPlaylist', playlist)
    .then(res => {
      dispatch({ type: ADD_PLAYLIST, payload: name });
    })
    .then(() => window.location.reload()) // Reload to update playlistItems w no errors
    .catch(err => {
      console.log(err);
      M.toast({ html: 'Error, please try again later' });
    });
};

// Add video to playlist
export const addVideo = (name, video) => dispatch => {
  let vidToAdd = {
    videoId: video,
    name: name
  };

  axios
    .put('/addPlaylistVideo', vidToAdd)
    .then(res => {
      M.toast({ html: res.data.message });
      dispatch({ type: ADD_VIDEO, payload: video });
    })
    .catch(err => {
      console.log(err);
      M.toast({ html: err });
    });
};

// Add video to playlist
export const removeVideo = (name, video) => dispatch => {
  let vidToRemove = {
    videoId: video,
    name: name
  };

  axios
    .post('/removePlaylistVideo', vidToRemove)
    .then(res => {
      M.toast({ html: res.data.message });
      dispatch({ type: REMOVE_VIDEO, payload: video });
    })
    .catch(err => {
      console.log(err);
      M.toast({ html: err });
    });
};

// Selected playlist
export const setCurrentPlaylist = playlist => dispatch => {
  dispatch({
    type: SET_CURRENT,
    payload: playlist
  });
};

export const clearCurrentPlaylist = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT
  });
};
