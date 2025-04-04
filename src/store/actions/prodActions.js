import axios from "axios";
import {
  LOAD_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCTS_ERROR,
  UPDATE_PRODUCTS,
  UPDATE_PRODUCTS_ERROR,
  DELETE_PRODUCTS
} from "../types/prodTypes";

export const getProductAction = () => {
  return async (dispatch) => {
    dispatch({ type: GET_PRODUCTS });
    try {
      const response = await axios.get("http://localhost:3001/products");
      console.log(response.data);
      dispatch({ type: LOAD_PRODUCTS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR, payload: error.message });
    }
  };
};

export const updateProductAction = (id, updatedData) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/products/${id}`,
        updatedData
      );
      dispatch({ type: UPDATE_PRODUCTS, payload: response.data });
    } catch (error) {
      dispatch({type: UPDATE_PRODUCTS_ERROR, payload: error.message});
    }
  };
};

export const deleteProductAction = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/products/${id}`
      );
      dispatch({ type: DELETE_PRODUCTS, payload: id });
    } catch (error) {
     console.log("Error deleting product", error.message)
    }
  }
};