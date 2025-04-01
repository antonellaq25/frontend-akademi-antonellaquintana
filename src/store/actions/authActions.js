import { LOGIN, LOGOUT } from '../types/authTypes';

export const loginAction = (userData) => ({ 
  type: LOGIN, 
  payload: userData 
});

export const logoutAction = () => ({ 
  type: LOGOUT 
});