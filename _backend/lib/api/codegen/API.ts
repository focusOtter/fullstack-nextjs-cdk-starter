/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTodoInput = {
  title: string,
  description: string,
  isCompleted: boolean,
};

export type Todo = {
  __typename: "Todo",
  id: string,
  title: string,
  description: string,
  isCompleted: boolean,
  owner: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTodoInput = {
  id: string,
  title: string,
  description: string,
  isCompleted: boolean,
};

export type PaginatedTodos = {
  __typename: "PaginatedTodos",
  todos:  Array<Todo >,
  nextToken?: string | null,
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput,
};

export type CreateTodoMutation = {
  createTodo:  {
    __typename: "Todo",
    id: string,
    title: string,
    description: string,
    isCompleted: boolean,
    owner: string,
    createdAt: string,
    updatedAt: string,
  },
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput,
};

export type UpdateTodoMutation = {
  updateTodo:  {
    __typename: "Todo",
    id: string,
    title: string,
    description: string,
    isCompleted: boolean,
    owner: string,
    createdAt: string,
    updatedAt: string,
  },
};

export type DeleteTodoMutationVariables = {
  id: string,
};

export type DeleteTodoMutation = {
  deleteTodo:  {
    __typename: "Todo",
    id: string,
    title: string,
    description: string,
    isCompleted: boolean,
    owner: string,
    createdAt: string,
    updatedAt: string,
  },
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo:  {
    __typename: "Todo",
    id: string,
    title: string,
    description: string,
    isCompleted: boolean,
    owner: string,
    createdAt: string,
    updatedAt: string,
  },
};

export type ListTodosQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos:  {
    __typename: "PaginatedTodos",
    todos:  Array< {
      __typename: "Todo",
      id: string,
      title: string,
      description: string,
      isCompleted: boolean,
      owner: string,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  },
};
