import {LoadingAction, LoadedAction, ErrorAction} from '../actions';
import {getAllCategories} from '../../api/api';

export default (dispatch, url = 'https://truyenfull.net/') => {
  dispatch(LoadingAction());
  return getAllCategories(url)
    .then(data => dispatch(LoadedAction(data)))
    .catch(() => dispatch(ErrorAction()));
};
