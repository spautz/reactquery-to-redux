import React, { ReactElement } from 'react';

import { useTodoList } from '../server-state';
import { TodoItem } from './TodoItem';

const TodoList = (): ReactElement => {
  const { isLoading, isError, data, error } = useTodoList();

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError || !data) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <ul>
      {data.map((todo) => (
        <TodoItem key={todo.id} todoId={todo.id} />
      ))}
    </ul>
  );
};

export { TodoList };
