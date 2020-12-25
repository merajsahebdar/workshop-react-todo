/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {RemoveTodoInput} from './../../../../app/__generated__/Schema';

// ====================================================
// GraphQL mutation operation: RemoveTodoMutation
// ====================================================

export interface RemoveTodoMutation_removeTodo {
  __typename: 'RemovedNode';
  id: number;
}

export interface RemoveTodoMutation {
  removeTodo: RemoveTodoMutation_removeTodo;
}

export interface RemoveTodoMutationVariables {
  input: RemoveTodoInput;
}
