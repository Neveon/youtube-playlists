import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_LOADING,
  DONE_LOADING,
  SET_BASE_URL
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: null,
  baseUrl: null
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
      return {
        ...state,
        authenticated: false,
        credentials: null
      };
    case SET_BASE_URL:
      return {
        ...state,
        baseUrl: action.payload
      };
    default:
      return state;
  }
};
