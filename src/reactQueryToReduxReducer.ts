import { ReactQueryState, SYNC_CHANGES_FROM_REACT_QUERY } from './internals';
import { AnyAction } from 'redux';

const initialState = null;

const reactQueryToReduxReducer = (
  state: ReactQueryState = initialState,
  action: AnyAction,
): ReactQueryState => {
  if (action.type === SYNC_CHANGES_FROM_REACT_QUERY) {
    return action.payload;
  }
  return state;
};

export { reactQueryToReduxReducer };
