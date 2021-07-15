import React, { ReactElement } from 'react';

import { useDeleteTodoMutation, useTodoInstance, useUpdateTodoMutation } from '../server-state';

interface TodoItemProps {
  todoId: string;
}

const TodoItem = (props: TodoItemProps): ReactElement => {
  const { todoId } = props;
  const { isLoading, isError, data, error } = useTodoInstance(todoId);

  const updateMutation = useUpdateTodoMutation(todoId);
  const deleteMutation = useDeleteTodoMutation(todoId);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError || !data) {
    return <span>Error: {error?.message}</span>;
  }

  if (updateMutation.isLoading) {
    return <span>Updating...</span>;
  }
  if (updateMutation.isError) {
    return <span>Update error: {updateMutation.error?.message}</span>;
  }

  if (deleteMutation.isLoading) {
    return <span>Deleting...</span>;
  }
  if (deleteMutation.isError) {
    return <span>Deletion error: {deleteMutation.error?.message}</span>;
  }

  // We can assume by this point that `isSuccess === true`
  return (
    <li
      onClick={(e) => {
        updateMutation.mutate({ isCompleted: !data.isCompleted });

        e.preventDefault();
        e.stopPropagation();
      }}
      style={{
        textDecoration: data.isCompleted ? 'line-through' : 'none',
      }}
    >
      {data.label}{' '}
      <button
        onClick={(e) => {
          deleteMutation.mutate();

          e.preventDefault();
          e.stopPropagation();
        }}
      >
        &times;
      </button>
    </li>
  );
};

export { TodoItem };
