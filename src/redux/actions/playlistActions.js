import {
  GET_PLAYLIST,
  ADD_PLAYLIST,
  REMOVE_PLAYLIST,
  SET_CURRENT,
  CLEAR_CURRENT,
  ADD_VIDEO,
  REMOVE_VIDEO,
  SET_LOADING,
  DONE_LOADING
} from '../types';

import axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js';

// Get user's playlists from server
export const getPlaylists = () => dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const FBIdToken = localStorage.getItem('FBIdtoken');
    axios.defaults.headers.common['Authorization'] = FBIdToken;
    axios.get('/playlists').then(res => {
      dispatch({
        type: GET_PLAYLIST,
        payload: res.data
      });
      dispatch({
        type: DONE_LOADING
      });
    });
  } catch (err) {
    M.toast({ html: 'Error getting playlists, try again later' });
    M.toast({ html: 'Check console log for details' });
    console.log(err);
  }
};

// Get all playlists from server - no auth required
export const getAllPlaylists = () => dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    axios.get('/allPlaylists').then(res => {
      dispatch({
        type: GET_PLAYLIST,
        payload: res.data
      });
      dispatch({
        type: DONE_LOADING
      });
    });
  } catch (err) {
    M.toast({ html: 'Error getting playlists, try again later' });
    M.toast({ html: 'Check console log for details' });
    console.log(err);
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
    M.toast({ html: 'Error, try again later. Check console log for details' });
    console.log(err);
  }
};

// Add playlist
export const addPlaylist = (name, video) => dispatch => {
  let playlist = {
    name: name,
    list: [video]
  };

  axios
    .put('/addPlaylist', playlist)
    .then(res => {
      dispatch({ type: ADD_PLAYLIST, payload: res.data });
    })
    .catch(err => {
      M.toast({ html: err.response.data.general });
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
      M.toast({
        html: 'Error, try again later. Check console log for details'
      });
    });
};

// Remove video from playlist
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
      M.toast({ html: err.response.data });
    });
};

// Selected playlist
export const setCurrentPlaylist = playlist => dispatch => {
  let playlistToGet = {
    name: playlist
  };
  dispatch({
    type: SET_LOADING
  });
  axios
    .post('/playlist', playlistToGet)
    .then(res => {
      dispatch({
        type: SET_CURRENT,
        payload: res.data
      });
      dispatch({
        type: DONE_LOADING
      });
    })
    .catch(err => {
      M.toast({ html: 'Error try again' });
      console.log(err);
    });
};

export const clearCurrentPlaylist = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT
  });
};
