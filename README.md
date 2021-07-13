# React Query to Redux

Sync your [React Query](https://react-query.tanstack.com/overview) state to [Redux](https://redux.js.org/), and access
React Query's records through selectors.

[![npm version](https://img.shields.io/npm/v/reactquery-to-redux.svg)](https://www.npmjs.com/package/reactquery-to-redux)
[![build status](https://github.com/spautz/reactquery-to-redux/workflows/CI/badge.svg)](https://github.com/spautz/reactquery-to-redux/actions)
[![dependencies Status](https://status.david-dm.org/gh/spautz/reactquery-to-redux.svg)](https://david-dm.org/spautz/reactquery-to-redux)
[![gzip size](https://img.badgesize.io/https://unpkg.com/reactquery-to-redux@latest/dist/reactquery-to-redux.cjs.production.min.js?compression=gzip)](https://bundlephobia.com/result?p=reactquery-to-redux)
[![test coverage](https://img.shields.io/coveralls/github/spautz/reactquery-to-redux/main.svg)](https://coveralls.io/github/spautz/reactquery-to-redux?branch=main)

## STILL IN DEVELOPMENT

This library is not yet ready for public use. Version 0.1.0 will be the first public release.

## Usage

`<SyncReactQueryToRedux />` syncs state from React Query to Redux. This is required.

```typescript jsx
import { SyncReactQueryToRedux } from 'reactquery-to-redux';

<Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <SyncReactQueryToRedux />
    <MyApp />
  </QueryClientProvider>
</Provider>;
```

`reactQueryToReduxReducer` handles the sync actions: add it to your reducer.

```typescript jsx
import { reactQueryToReduxReducer } from 'reactquery-to-redux';

const yourRootReducer = combineReducers({
  ...yourOtherReducers,
  reactQueryToRedux: reactQueryToReduxReducer,
});

const store = createStore(yourRootReducer);
```

Use selectors to access query and mutation state: these roughly correspond to React Query's hooks.

Note: these are [Dynamic Selectors](https://github.com/spautz/dynamic-selectors), so they work like plain functions.
To use them with [Reselect](https://github.com/reduxjs/reselect) selectors you must bind the `queryKey` using
[reselectSelectorFromDynamic](https://github.com/spautz/dynamic-selectors/tree/main/packages/with-reselect#reselectselectorfromdynamicdynamicselector-params).

```typescript jsx
import {
  selectQuery,
  selectQueries,
  selectInfiniteQuery,
  selectMutation,
  selectIsFetching,
  selectIsMutating,
} from 'reactquery-to-redux';

const queryInfo = selectQuery(state, queryKey);
// or, to combine with existing Reselect selectors
const myReselectSelector = createSelector(
  [reselectSelectorFromDynamic(selectQuery, queryKey), someOtherSelector],
  (queryInfo, someOtherData) => {
    /* ... */
  },
);
```

## Do I need this?

You probably don't need this. React Query and Redux work fine side-by-side. You can already use values from React Query
and Redux together in a component.

This library is useful for accessing React Query state via a selector, or from outside of a React component -- such as
[Redux-Saga](https://redux-saga.js.org/docs/About) or other tools that interact with Redux asynchronously.

It can also facilitate a migration from Redux to React Query.

## Options

(TODO)

## Demo

(TODO)

## React Query version compatibility

| React Query | ReactQuery-to-Redux |
| ----------: | ------------------: |
|    `3.18.x` |        `UNRELEASED` |

Other versions of React Query and ReactQuery-to-Redux may be compatible: this table just lists the thoroughly tested
pairings.
