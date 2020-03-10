export const LOADING_ACTION = 'LOADING_ACTION';
export const LOADED_ACTION = 'LOADED_ACTION';
export const ERROR_ACTION = 'ERROR_ACTION';

export const LoadingAction = () => ({
  type: LOADING_ACTION,
  state: {
    loading: true,
  },
});

export const LoadedAction = data => ({
  type: LOADED_ACTION,
  state: {
    loading: false,
    data,
  },
});

export const ErrorAction = () => ({
  type: ERROR_ACTION,
  state: {
    loading: false,
    error: true,
  },
});
