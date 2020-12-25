/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum StatusOfTodo {
  DONE = 'DONE',
  IDLE = 'IDLE',
}

export interface CreateTodoInput {
  title: string;
  status?: StatusOfTodo | null;
}

export interface RemoveTodoInput {
  id: number;
}

export interface UpdateTodoInput {
  id: number;
  title?: string | null;
  status?: StatusOfTodo | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
