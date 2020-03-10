import {LoadingAction, LoadedAction, ErrorAction} from '../actions';
import {getInfoStory} from '../../api/api';

export default (dispatch, url) => {
  dispatch(LoadingAction());
  return getInfoStory(url)
    .then(data => dispatch(LoadedAction(data)))
    .catch(() => dispatch(ErrorAction()));
};
