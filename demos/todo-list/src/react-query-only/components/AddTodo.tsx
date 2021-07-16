import React, { ReactElement, useState } from 'react';
import { useCreateTodoMutation } from '../server-state';

const AddTodo = (): ReactElement => {
  const createMutation = useCreateTodoMutation();

  const [newTodoLabel, setNewLabel] = useState('');

  return (
    <div>
      {createMutation.isLoading ? (
        'Adding todo...'
      ) : (
        <>
          {createMutation.isError ? (
            <div>An error occurred: {createMutation.error?.message}</div>
          ) : null}

          {createMutation.isSuccess ? <div>Todo added!</div> : null}

          <form
            onSubmit={(e) => {
              createMutation.mutate(newTodoLabel);
              setNewLabel('');
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <input
              type="text"
              value={newTodoLabel}
              onChange={(e) => {
                setNewLabel(e.target.value);
              }}
            />

            <button type="submit">Create Todo</button>
          </form>
        </>
      )}
    </div>
  );
};

export { AddTodo };
