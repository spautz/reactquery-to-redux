import { ReactElement } from 'react';

const IntroHeader = (): ReactElement => {
  return (
    <>
      <h2>
        <a href="https://github.com/spautz/reactquery-to-redux">React Query to Redux</a>: Todo List
        Demo
      </h2>
      <p>
        Use the{' '}
        <a
          href="https://github.com/zalmoxisus/redux-devtools-extension#installation"
          target="_blank"
          rel="noopener noreferrer"
        >
          Redux Devtools extension
        </a>{' '}
        to watch the Redux state.
      </p>
      <p>
        <a
          href="https://github.com/spautz/reactquery-to-redux/tree/main/demos/todo-list"
          target="_blank"
          rel="noopener noreferrer"
        >
          View source and readme
        </a>
      </p>
    </>
  );
};

export { IntroHeader };
