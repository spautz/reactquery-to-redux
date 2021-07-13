import React, { ReactElement } from 'react';

import { options } from 'reactquery-to-redux';

function App(): ReactElement {
  return <div>TODO: Todos, {JSON.stringify(options)}</div>;
}

export { App };
