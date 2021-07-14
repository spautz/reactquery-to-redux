import { configureStore } from '@reduxjs/toolkit';

import { options, reactQueryToReduxReducer } from 'reactquery-to-redux';

const someOtherData = { otherReduxStateGoesHere: true };
const someOtherReducer = (state = someOtherData /* , action */) => {
  return state;
};

const store = configureStore({
  reducer: {
    otherData: someOtherReducer,
    [options.reduxKey]: reactQueryToReduxReducer,
  },
});

export { store };
