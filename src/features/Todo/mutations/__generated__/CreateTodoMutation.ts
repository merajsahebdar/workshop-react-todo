/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {CreateTodoInput, StatusOfTodo} from './../../../../app/__generated__/Schema';

// ====================================================
// GraphQL mutation operation: CreateTodoMutation
// ====================================================

export interface CreateTodoMutation_createTodo {
  __typename: 'Todo';
  id: number;
  title: string;
  status: StatusOfTodo;
  updatedAt: any;
}

export interface CreateTodoMutation {
  createTodo: CreateTodoMutation_createTodo;
}

export interface CreateTodoMutationVariables {
  input: CreateTodoInput;
}
