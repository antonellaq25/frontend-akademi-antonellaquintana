import { LOGIN, LOGOUT } from '../types/authTypes';

const initialState = {
  user: null,
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducers;