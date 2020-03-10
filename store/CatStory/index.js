import {LoadingAction, LoadedAction, ErrorAction} from '../actions';
import {getStoriesByCategory} from '../../api/api';

export default (dispatch, url) => {
  dispatch(LoadingAction());
  return getStoriesByCategory(url)
    .then(data => dispatch(LoadedAction(data)))
    .catch(() => dispatch(ErrorAction()));
};
