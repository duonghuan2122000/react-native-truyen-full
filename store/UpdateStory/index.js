import {LoadingAction, LoadedAction, ErrorAction} from '../actions';
import {getUpdateStory} from '../../api/api';

export default (
  dispatch,
  url = 'https://truyenfull.net/danh-sach/truyen-moi/',
) => {
  dispatch(LoadingAction());
  return getUpdateStory(url)
    .then(data => dispatch(LoadedAction(data)))
    .catch(() => dispatch(ErrorAction()));
};
