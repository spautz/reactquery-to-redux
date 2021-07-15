import { useQuery, UseQueryResult } from 'react-query';
import { fetchTodo, fetchAllTodos, TodoRecord } from './fakeBackend';

const useTodoInstance = (todoId: string): UseQueryResult<TodoRecord, Error> => {
  return useQuery(['todos', todoId], () => fetchTodo(todoId));
};

const useTodoList = (): UseQueryResult<Array<TodoRecord>, Error> => {
  return useQuery(['todos'], () => fetchAllTodos());
};

export { useTodoInstance, useTodoList };
