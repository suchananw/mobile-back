import axios from "axios";

import { GET_CAT, GET_CATS, CAT_LOADING } from "./types";

// Get current cat
export const getCurrentCat = () => dispatch => {
  dispatch(setCatLoading());
  axios
    .get("/api/cat")
    .then(res =>
      dispatch({
        type: GET_CAT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CAT,
        payload: {}
      })
    );
};

// Get cat by handle
export const getCatByHandle = handle => dispatch => {
  dispatch(setCatLoading());
  axios
    .get(`/api/cat/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_CAT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CAT,
        payload: null
      })
    );
};

// Get all cats
export const getCats = () => dispatch => {
  dispatch(setCatLoading());
  axios
    .get("/api/cat/all")
    .then(res =>
      dispatch({
        type: GET_CATS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CATS,
        payload: null
      })
    );
};

// Cat loading
export const setCatLoading = () => {
  return {
    type: CAT_LOADING
  };
};
