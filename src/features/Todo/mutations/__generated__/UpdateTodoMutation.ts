/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {UpdateTodoInput, StatusOfTodo} from './../../../../app/__generated__/Schema';

// ====================================================
// GraphQL mutation operation: UpdateTodoMutation
// ====================================================

export interface UpdateTodoMutation_updateTodo {
  __typename: 'Todo';
  id: number;
  title: string;
  status: StatusOfTodo;
  updatedAt: any;
}

export interface UpdateTodoMutation {
  updateTodo: UpdateTodoMutation_updateTodo;
}

export interface UpdateTodoMutationVariables {
  input: UpdateTodoInput;
}
