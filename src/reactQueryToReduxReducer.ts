import {
  ReactQueryState,
  SYNC_CHANGES_FROM_REACT_QUERY,
  SyncFromReactQueryAction,
} from './internals';

const initialState = null;

const reactQueryToReduxReducer = (
  state: ReactQueryState = initialState,
  action: SyncFromReactQueryAction,
): ReactQueryState => {
  if (action.type === SYNC_CHANGES_FROM_REACT_QUERY) {
    return action.payload;
  }
  return state;
};

export { reactQueryToReduxReducer };
