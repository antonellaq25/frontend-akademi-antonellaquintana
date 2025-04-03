import { combineReducers } from 'redux';
import authReducers from './authReducers';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';


const rootReducer = combineReducers({
  auth: authReducers,
  product: productReducer,
  category: categoryReducer
});

export default rootReducer;
