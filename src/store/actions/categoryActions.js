import axios from "axios";
import { LOAD_CATEGORIES , GET_CATEGORIES, GET_CATEGORIES_ERROR} from '../types/categoryTypes';

export const getCategoryAction = () => { 
  return async (dispatch) => {
    dispatch ({type:  GET_CATEGORIES });

    try {
      const response = await axios.get('http://localhost:3001/categories');
      console.log(response.data);
      dispatch ({type: LOAD_CATEGORIES , payload: response.data });
    }catch (error) {
      dispatch({type:GET_CATEGORIES_ERROR, payload:error.message})
    }

  }};
