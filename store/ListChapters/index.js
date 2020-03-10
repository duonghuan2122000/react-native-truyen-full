import {LoadingAction, LoadedAction, ErrorAction} from '../actions';
import {getAllChapters} from '../../api/api';

export default (dispatch, truyenID, urlStory) => {
  dispatch(LoadingAction());
  return getAllChapters(truyenID, urlStory)
    .then(data => dispatch(LoadedAction(data)))
    .catch(() => dispatch(ErrorAction()));
};
