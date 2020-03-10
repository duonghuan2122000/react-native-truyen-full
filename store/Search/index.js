import {LoadingAction, LoadedAction, ErrorAction} from '../actions';
import {getStoriesBySearch} from '../../api/api';

export default (dispatch, keyword) => {
  dispatch(LoadingAction());
  return getStoriesBySearch(keyword)
    .then(data => dispatch(LoadedAction(data)))
    .catch(() => dispatch(ErrorAction()));
};
