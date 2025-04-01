import { combineReducers } from 'redux';
import authReducers from './authReducers';
import productReducer from './productReducer';


const rootReducer = combineReducers({
  auth: authReducers,
  product: productReducer,
});

export default rootReducer;
