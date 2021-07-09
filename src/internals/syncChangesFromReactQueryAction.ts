import { ReactQueryState } from './types';

const SYNC_CHANGES_FROM_REACT_QUERY = 'SYNC_CHANGES_FROM_REACT_QUERY';

export interface SyncFromReactQueryAction {
  type: typeof SYNC_CHANGES_FROM_REACT_QUERY;
  payload: ReactQueryState;
}

const syncChangesFromReactQueryAction = (newState: ReactQueryState): SyncFromReactQueryAction => ({
  type: SYNC_CHANGES_FROM_REACT_QUERY,
  payload: newState,
});

export { SYNC_CHANGES_FROM_REACT_QUERY, syncChangesFromReactQueryAction };
