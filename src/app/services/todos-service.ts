import { Injectable, signal } from '@angular/core';

import { Subject } from 'rxjs';
import { createInitialTodo, ITodo, TodoAction } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  public isFormShowing = signal(true);
  public todoModel = signal<ITodo>(createInitialTodo());

  private todoActionSubject = new Subject<TodoAction>();
  public todoAction$ = this.todoActionSubject.asObservable();

  public todoAction(action: TodoAction): void {
    this.todoActionSubject.next(action);
  }
}
