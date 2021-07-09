import { AnyAction, Store, createStore, combineReducers } from 'redux';

import { ReduxState } from '../../internals';
import { reactQueryToReduxReducer } from '../../reactQueryToReduxReducer';

const VALUE1_DEFAULT = 100;
const VALUE2_DEFAULT = 200;

const INCREMENT_KEY = 'INCREMENT_KEY';
const incrementKeyAction = (key: string): AnyAction => ({
  type: INCREMENT_KEY,
  payload: { key },
});

const testReducer = (state: ReduxState = initialTestState, action: AnyAction): ReduxState => {
  if (action.type === 'INCREMENT_KEY') {
    const { key } = action.payload;

    return {
      ...state,
      [key]: (state[key] || 0) + 1,
    };
  }
  return state;
};

const initialTestState = {
  value1: VALUE1_DEFAULT,
  value2: VALUE2_DEFAULT,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createTestStore = (initialState: any = {}): Store => {
  return createStore(
    combineReducers({
      test: testReducer,
      reactQuery: reactQueryToReduxReducer,
    }),
    initialState,
  );
};

export {
  VALUE1_DEFAULT,
  VALUE2_DEFAULT,
  createTestStore,
  incrementKeyAction,
  initialTestState,
  testReducer,
};
