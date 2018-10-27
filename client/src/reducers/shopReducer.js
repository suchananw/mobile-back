import {
  GET_CAT,
  GET_CATS,
  CLEAR_CURRENT_CAT,
  CAT_LOADING
} from "../actions/types";

const initialState = {
  cat: null,
  cats: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CAT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CAT:
      return {
        ...state,
        cat: action.payload,
        loading: false
      };
    case GET_CATS:
      return {
        ...state,
        cats: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_CAT:
      return {
        ...state,
        cat: null
      };
    default:
      return state;
  }
}
