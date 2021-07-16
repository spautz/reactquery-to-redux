import React, { ReactElement } from 'react';
import { SyncReactQueryToRedux } from 'reactquery-to-redux';

const ReactQueryThroughRedux = (): ReactElement => {
  return (
    <>
      <SyncReactQueryToRedux />
      App goes here
    </>
  );
};

export { ReactQueryThroughRedux };
