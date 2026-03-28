import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { createInitialTodo, ITodo, ITodoResult, todoSchema } from '../../../models/todo.model';
import { form, FormField } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { ApiTodos } from '../../../services/api/api-todos';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodosResult } from './todos-result/todos-result';

@Component({
  selector: 'app-todos',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormField,
    MatCheckboxModule,
    MatButtonModule,
    NgClass,
    TodosResult,
  ],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos implements OnInit {
  private readonly apiTodosService = inject(ApiTodos);
  private readonly destroyRef = inject(DestroyRef);

  private todos = signal<ITodoResult[]>([]);
  protected filteredTodos = signal<ITodoResult[]>([]);

  protected todoModel = signal<ITodo>(createInitialTodo());
  protected todoForm = form(this.todoModel, todoSchema);
  protected isFormShowing = signal(true);
  protected isLoading = false;

  ngOnInit(): void {
    this.getTodos();
  }

  /**
   * getTodos
   */
  private getTodos(): void {
    this.isLoading = true;

    this.apiTodosService
      .getTodos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.isLoading = false;
        const response: ITodoResult[] = res.map((x) => ({ ...x, isSelected: false }));
        this.todos.set(response);
        this.filteredTodos.set(response);
      });
  }

  /**
   * onSubmit
   * @param e Event
   */
  protected onSubmit(e: Event): void {
    e.preventDefault();
    if (this.todoForm().invalid()) return;
  }

  protected toggleForm(): void {
    this.isFormShowing.set(!this.isFormShowing());
  }
}
