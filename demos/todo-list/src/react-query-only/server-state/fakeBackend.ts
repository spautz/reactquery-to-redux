export interface TodoRecord {
  id: string;
  label: string;
  isCompleted: boolean;
}

const fakeTodoStore: Record<TodoRecord['id'], TodoRecord> = Object.create(null);
let _nextId = Object.keys(fakeTodoStore).length;

function nextId(): string {
  const newId = String(_nextId);
  _nextId++;
  return newId;
}

const fakeTodoBackendOptions = {
  delay: process.env.NODE_ENV !== 'test' ? 1000 : 0,
};

// Temporary fix since this isn't a 'real' fake backend
const resolveResponseData = async (response: Response) => {
  console.log('resolveResponseData() ', response);
  const rawText = await response.text();
  console.log('rawText = ', rawText);
  return rawText && JSON.parse(rawText);
};

async function successResponse(data: unknown = '') {
  const stringifiedBody = typeof data === 'string' ? data : JSON.stringify(data);
  const response = new Response(stringifiedBody, {
    status: 200,
    statusText: 'OK',
  });
  await new Promise((resolve) => setTimeout(resolve, fakeTodoBackendOptions.delay));

  // return response;
  return await resolveResponseData(response);
}

async function failureResponse(status = 500, data: unknown = '') {
  const stringifiedBody = typeof data === 'string' ? data : JSON.stringify(data);
  const response = new Response(stringifiedBody, {
    status,
  });
  await new Promise((resolve) => setTimeout(resolve, fakeTodoBackendOptions.delay));

  // return response;
  return await resolveResponseData(response);
}

// ================================================================================================

async function createTodo({ label }: { label: string }): Promise<Response> {
  const id = nextId();
  const newTodo = {
    id,
    label,
    isCompleted: false,
  };

  fakeTodoStore[id] = newTodo;

  return await successResponse(newTodo);
}

async function updateTodo({
  id,
  isCompleted,
}: {
  id: string;
  isCompleted: boolean;
}): Promise<Response> {
  const todo = fakeTodoStore[id];
  if (!todo) {
    return await failureResponse(404);
  }

  Object.assign(todo, {
    isCompleted,
  });

  return await successResponse(todo);
}

async function deleteTodo(id: string): Promise<Response> {
  const todo = fakeTodoStore[id];
  if (!todo) {
    return await failureResponse(404);
  }

  delete fakeTodoStore[id];

  return await successResponse();
}

async function fetchTodo(id: string): Promise<Response> {
  const todo = fakeTodoStore[id];
  if (!todo) {
    return await failureResponse(404);
  }

  return await successResponse(todo);
}

async function fetchAllTodos(): Promise<Response> {
  return await successResponse(Object.values(fakeTodoStore));
}

export { fakeTodoStore, createTodo, updateTodo, deleteTodo, fetchTodo, fetchAllTodos };
