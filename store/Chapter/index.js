import {LoadingAction, LoadedAction, ErrorAction} from '../actions';
import {getInfoChapter} from '../../api/api';

export default (dispatch, url = 'https://truyenfull.net/') => {
  dispatch(LoadingAction());
  return getInfoChapter(url)
    .then(data => dispatch(LoadedAction(data)))
    .catch(() => dispatch(ErrorAction()));
};
