/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {StatusOfTodo} from './../../../../app/__generated__/Schema';

// ====================================================
// GraphQL query operation: TodosQuery
// ====================================================

export interface TodosQuery_todos {
  __typename: 'Todo';
  id: number;
  title: string;
  status: StatusOfTodo;
  updatedAt: any;
}

export interface TodosQuery {
  todos: TodosQuery_todos[];
  todosCount: number;
}
