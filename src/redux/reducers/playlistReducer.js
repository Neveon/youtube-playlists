import {
  GET_PLAYLIST,
  ADD_PLAYLIST,
  REMOVE_PLAYLIST,
  SET_CURRENT,
  CLEAR_CURRENT
} from '../types';

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
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
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
