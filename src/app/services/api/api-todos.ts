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

  /**
   * addTodo
   * @param todo ITodo
   * @returns Observable<ITodo>
   */
  public addTodo(todo: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>(this.todoUrl, todo);
  }

  /**
   * updateTodo
   * @param todo ITodo
   * @returns Observable<ITodo>
   */
  public updateTodo(todo: ITodo): Observable<ITodo> {
    return this.http.patch<ITodo>(`${this.todoUrl}/${todo.id}`, { isActive: false });
  }

  /**
   * deleteTodo
   * @param id string
   * @returns Observable<void>
   */
  public deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.todoUrl}/${id}`);
  }
}
