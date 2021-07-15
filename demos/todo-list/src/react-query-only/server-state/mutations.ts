import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { createTodo, updateTodo, deleteTodo } from './fakeBackend';

const useCreateTodoMutation = (): UseMutationResult<Response, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation((label: string) => createTodo({ label }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};

const useUpdateTodoMutation = (
  todoId: string,
): UseMutationResult<Response, Error, { isCompleted: boolean }> => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ isCompleted }: { isCompleted: boolean }) => updateTodo({ id: todoId, isCompleted }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos', todoId]);
      },
    },
  );
};

const useDeleteTodoMutation = (todoId: string): UseMutationResult<Response, Error, void> => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteTodo(todoId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};

export { useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation };
