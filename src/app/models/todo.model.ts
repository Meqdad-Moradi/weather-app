import { minLength, required, schema } from '@angular/forms/signals';

export interface ITodo {
  id: string;
  description: string;
  isActive: boolean;
}

export interface ITodoResult extends ITodo {
  isSelected: boolean;
}

export function createInitialTodo(): ITodo {
  return {
    id: '1',
    description: '',
    isActive: true,
  };
}

export const todoSchema = schema<ITodo>((rootPath) => {
  required(rootPath.description, { message: "Can't be empty" });
  minLength(rootPath.description, 2, { message: 'At least 2 characters!' });
});

export enum EnTodoAction {
  Done = 'done',
  Delete = 'delete',
}

export interface TodoAction {
  action: EnTodoAction;
  id: string;
}
