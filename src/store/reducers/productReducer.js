import { LOAD_PRODUCTS } from '../types/authTypes';

const initialState = {
  products: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export default authReducers;