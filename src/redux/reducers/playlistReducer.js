import {
  GET_PLAYLIST,
  ADD_PLAYLIST,
  REMOVE_PLAYLIST,
  SET_CURRENT,
  CLEAR_CURRENT,
  ADD_VIDEO,
  REMOVE_VIDEO
} from '../types';
import M from 'materialize-css/dist/js/materialize.min.js';

// state defined in store as playlist
const initialState = {
  current: null,
  allPlaylists: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYLIST:
      return {
        ...state,
        allPlaylists: action.payload
      };
    case ADD_PLAYLIST:
      return {
        ...state,
        allPlaylists: [...state.allPlaylists, action.payload]
      };
    case REMOVE_PLAYLIST: // payload is playlist name to delete
      return {
        ...state,
        allPlaylists: state.allPlaylists.filter(
          playlist => playlist.name !== action.payload
        )
      };
    case ADD_VIDEO:
      if (state.current[0].list.indexOf(action.payload) === -1) {
        let deepCopyCurrent = JSON.parse(JSON.stringify(state.current));
        deepCopyCurrent[0].list.push(action.payload);
        return {
          current: deepCopyCurrent,
          allPlaylists: state.allPlaylists.map(playlist => {
            if (playlist.name === state.current[0].name) {
              playlist.list.push(action.payload);
            }
            return playlist;
          })
        };
      } else {
        M.toast({ html: 'Video already added' });
        return state;
      }
    case REMOVE_VIDEO:
      // if the video doesn't exist in current then nothing to remove
      if (state.current[0].list.indexOf(action.payload) === -1) {
        M.toast({ html: 'Video already removed' });
        return state;
      } else {
        // filter video ID from current and playlist list
        let deepCopyCurrent = JSON.parse(JSON.stringify(state.current));
        deepCopyCurrent[0].list = deepCopyCurrent[0].list.filter(
          id => id !== action.payload
        );
        return {
          current: deepCopyCurrent,
          allPlaylists: state.allPlaylists.map(playlist => {
            if (playlist.name === state.current[0].name) {
              playlist.list.filter(id => id !== action.payload);
            }
            return playlist;
          })
        };
      }
    case SET_CURRENT:
      return {
        ...state,
        current: [action.payload]
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    default:
      return state;
  }
};
