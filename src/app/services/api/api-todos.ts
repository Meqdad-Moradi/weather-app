import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from '../../models/todo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiTodos {
  private readonly todoUrl = 'http://localhost:3000/todos';
  private readonly http = inject(HttpClient);

  /**
   * getTodos
   * @returns Observable<ITodo[]>
   */
  public getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.todoUrl);
  }
}
