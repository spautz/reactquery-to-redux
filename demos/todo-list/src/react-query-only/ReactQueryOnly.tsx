import React, { ReactElement } from 'react';
import { AddTodo, TodoList } from './components';

const ReactQueryOnly = (): ReactElement => {
  return (
    <>
      <AddTodo />
      <TodoList />
    </>
  );
};

export { ReactQueryOnly };
