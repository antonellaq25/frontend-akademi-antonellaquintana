import {
  LOAD_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCTS_ERROR,
  UPDATE_PRODUCTS_ERROR,
  UPDATE_PRODUCTS,
} from "../types/prodTypes";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  console.log("Acción recibida :", action.type, action.payload);

  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, loading: true, error: null };
    case LOAD_PRODUCTS:
      console.log("Productos cargados :", action.payload);
      return { ...state, loading: false, products: action.payload };
    case GET_PRODUCTS_ERROR:
      console.error("Error al cargar productos:", action.payload);
      return { ...state, loading: false, error: action.payload };
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case UPDATE_PRODUCTS_ERROR:
      console.error("Error al cargar productos:", action.payload);
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default productReducer;
