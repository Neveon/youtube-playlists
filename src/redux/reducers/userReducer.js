import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_LOADING } from '../types';

const initialState = {
  authenticated: false,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    default:
      return state;
  }
};
