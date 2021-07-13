import React, { ReactElement } from 'react';

import { defaultOptions } from 'reactquery-to-redux';

console.log('defaultOptions = ', defaultOptions);

function App(): ReactElement {
  return <div>TODO: Todos, {JSON.stringify(defaultOptions)}</div>;
}

export default App;
