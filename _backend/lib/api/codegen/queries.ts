/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getTodos = /* GraphQL */ `query GetTodos($id: String!) {
  getTodos(id: $id) {
    id
    title
    description
    isCompleted
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTodosQueryVariables, APITypes.GetTodosQuery>;
export const listTodos = /* GraphQL */ `query ListTodos($limit: Int) {
  listTodos(limit: $limit) {
    todos {
      id
      title
      description
      isCompleted
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTodosQueryVariables, APITypes.ListTodosQuery>;
