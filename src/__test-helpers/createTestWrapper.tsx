import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';

import { SyncReactQueryToRedux } from '../SyncReactQueryToRedux';

const createTestWrapper =
  (testStore: Store): React.FC =>
  (props) => {
    const { children, ...anyOtherProps } = props;

    return (
      <Provider store={testStore}>
        <SyncReactQueryToRedux {...anyOtherProps} />
        {children}
      </Provider>
    );
  };

export { createTestWrapper };
