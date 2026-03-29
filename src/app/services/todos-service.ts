import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { TodoAction } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todoActionSubject = new Subject<TodoAction>();
  public todoAction$ = this.todoActionSubject.asObservable();

  public todoAction(action: TodoAction): void {
    this.todoActionSubject.next(action);
  }
}
