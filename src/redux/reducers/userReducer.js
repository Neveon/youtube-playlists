import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_LOADING,
  DONE_LOADING
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        credentials: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case DONE_LOADING:
      return {
        ...state,
        loading: false
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    default:
      return state;
  }
};
