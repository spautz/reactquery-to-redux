import React from 'react';
import { Store } from 'redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { reduxStoreRef } from '../internals';
import { SyncReactQueryToRedux } from '../SyncReactQueryToRedux';

import { createTestStore } from './_helpers';

describe('read React-Query state through Redux', () => {
  let testStore: Store;
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();

    testStore = createTestStore();
  });

  it('needs to be within a Redux context', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockReturnValueOnce();

    const queryClient = new QueryClient();

    expect(() => {
      render(
        <QueryClientProvider client={queryClient}>
          <SyncReactQueryToRedux />
        </QueryClientProvider>,
      );
    }).toThrowError(
      'could not find react-redux context value; please ensure the component is wrapped in a <Provider>',
    );

    const consoleErrorCalls = consoleErrorSpy.mock.calls;
    expect(consoleErrorCalls.length).toBe(2);
    expect(consoleErrorCalls[0][0]).toMatch(
      'Error: could not find react-redux context value; please ensure the component is wrapped in a <Provider>',
    );
    expect(consoleErrorCalls[1][0]).toMatch(
      'The above error occurred in the <SyncReactQueryToRedux> component:',
    );
  });

  it('needs to be within a QueryClientProvider context', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockReturnValueOnce();

    expect(() => {
      render(
        <Provider store={testStore}>
          <SyncReactQueryToRedux />
        </Provider>,
      );
    }).toThrowError('No QueryClient set, use QueryClientProvider to set one');

    const consoleErrorCalls = consoleErrorSpy.mock.calls;
    expect(consoleErrorCalls.length).toBe(2);
    expect(consoleErrorCalls[0][0]).toMatch(
      'Error: No QueryClient set, use QueryClientProvider to set one',
    );
    expect(consoleErrorCalls[1][0]).toMatch(
      'The above error occurred in the <SyncReactQueryToRedux> component:',
    );
  });

  it('warns if SyncReactQueryToRedux is given invalid options', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockReturnValueOnce();

    const queryClient = new QueryClient();

    render(
      <Provider store={testStore}>
        <QueryClientProvider client={queryClient}>
          {/* @ts-expect-error Invalid prop */}
          <SyncReactQueryToRedux invalidOption={123} />
        </QueryClientProvider>
      </Provider>,
    );

    const consoleWarnCalls = consoleWarnSpy.mock.calls;
    expect(consoleWarnCalls.length).toBe(1);
    const [warningString] = consoleWarnCalls[0];
    expect(warningString).toBe('SyncReactQueryToRedux: Unrecognized option "invalidOption"');
  });

  it('sets a reference to the redux store synchronously on mount', () => {
    const queryClient = new QueryClient();

    render(
      <Provider store={testStore}>
        <QueryClientProvider client={queryClient}>
          <SyncReactQueryToRedux />
        </QueryClientProvider>
      </Provider>,
    );

    expect(reduxStoreRef.c).toBeTruthy();
  });

  it('clears its reference to the redux store on unmount', async () => {
    const queryClient = new QueryClient();

    const { rerender } = render(
      <Provider store={testStore}>
        <QueryClientProvider client={queryClient}>
          <SyncReactQueryToRedux />
        </QueryClientProvider>
      </Provider>,
    );

    expect(reduxStoreRef.c).toBeTruthy();

    rerender(<div />);

    expect(reduxStoreRef.c).toBeNull();
  });
});
