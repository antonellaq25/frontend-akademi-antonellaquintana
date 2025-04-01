import { LOAD_PRODUCTS, GET_PRODUCTS} from '../types/prodTypes';

export const loadProductAction = (productsData) => ({ 
  type: LOAD_PRODUCTS , 
  payload: productsData 
});

export const getProductAction = () => ({ 
  type:  GET_PRODUCTS 
});