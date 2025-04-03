import { LOAD_CATEGORIES , GET_CATEGORIES, GET_CATEGORIES_ERROR} from '../types/categoryTypes';

const initialState = {
  categories: [],
  loading: false,
  error: null
};

const categoryReducer = (state = initialState, action) => {
  console.log("Acción recibida :", action.type, action.payload);

  switch (action.type) {
    case  GET_CATEGORIES:
      return { ...state, loading: true, error: null };
    case LOAD_CATEGORIES:
      console.log("Productos cargados :", action.payload);
      return { ...state, loading: false, categories: action.payload };
    case GET_CATEGORIES_ERROR:
      console.error("Error al cargar productos:", action.payload);
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default categoryReducer;