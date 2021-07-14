import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';

import { IntroHeader } from './IntroHeader';
import { ReactQueryOnly, queryClient } from './react-query-only';
import { ReactQueryThroughRedux, store } from './react-query-through-redux';

function App(): ReactElement {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <IntroHeader />

        <h3>React Query</h3>
        <ReactQueryOnly />

        <h3>Redux</h3>
        <ReactQueryThroughRedux />
      </QueryClientProvider>
    </Provider>
  );
}

export { App };
