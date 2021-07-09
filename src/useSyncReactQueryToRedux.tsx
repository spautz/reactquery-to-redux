import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useSelector, useStore } from 'react-redux';

import { ReduxState, reduxStoreRef } from './internals';
import { ReactQueryToReduxOptions, /* options, */ defaultOptions } from './options';

const selectEntireState = (state: ReduxState) => state;

const useSyncReactQueryToRedux = (
  optionOverrides: Partial<ReactQueryToReduxOptions> = {},
): void => {
  // const { readEnabled, writeEnabled, isDehydrated } = { ...options, ...optionOverrides };

  // If any values are passed via props, sync them as options
  if (process.env.NODE_ENV !== 'production') {
    Object.keys(optionOverrides).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
        console.warn(`SyncReactQueryToRedux: Unrecognized option "${key}"`);
      }
    });
  }

  // We need to set this synchronously so that components can read on mount
  reduxStoreRef.c = useStore();
  useEffect(() => {
    return () => {
      // Clear ref on unmount
      reduxStoreRef.c = null;
    };
  }, []);

  const currentReduxState = useSelector(selectEntireState);
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();

  // @TODO: Push changes from queryClient to Redux
  console.log('queryCache = ', queryCache);
  console.log('dehydratedState = ', dehydrate(queryClient));

  // @TODO: Detect and handle changes from redux, when `writeEnabled` is set
  console.log('currentReduxState = ', currentReduxState);
};

export { useSyncReactQueryToRedux };
