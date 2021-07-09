import React, { Fragment } from 'react';
import { ReactQueryToReduxOptions, options } from './options';
import { useSyncReactQueryToRedux } from './useSyncReactQueryToRedux';

export type SyncReactQueryToReduxProps = Partial<ReactQueryToReduxOptions>;

const SyncReactQueryToRedux: React.FC<SyncReactQueryToReduxProps> = (props) => {
  const { children, ...optionProps } = props;

  useSyncReactQueryToRedux(optionProps);
  Object.assign(options, optionProps);

  if (process.env.NODE_ENV !== 'production' && children) {
    console.warn(
      'Passing children to <SyncReactQueryToRedux> is not recommended because they will rerender on *every* Redux change',
    );
  }

  return <Fragment>{children}</Fragment>;
};

export { SyncReactQueryToRedux };
