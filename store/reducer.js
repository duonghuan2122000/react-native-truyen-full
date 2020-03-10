import {LOADING_ACTION, LOADED_ACTION, ERROR_ACTION} from './actions';

export const initialState = {
  loading: false,
  data: null,
  error: false,
};

export default (state, action) => {
  let actions = [LOADING_ACTION, LOADED_ACTION, ERROR_ACTION];
  if (actions.includes(action.type)) {
    return {...state, ...action.state};
  }
  return {...state, error: true};
};
