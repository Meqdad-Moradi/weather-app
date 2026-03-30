import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';

import {
  createInitialTodo,
  EnTodoAction,
  ITodo,
  ITodoResult,
  todoSchema,
} from '../../../models/todo.model';
import { form, FormField } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { ApiTodos } from '../../../services/api/api-todos';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodosResult } from './todos-result/todos-result';
import { TodosService } from '../../../services/todos-service';

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
  private readonly todosService = inject(TodosService);
  private readonly destroyRef = inject(DestroyRef);

  private todos = signal<ITodoResult[]>([]);

  protected todoModel = signal<ITodo>(createInitialTodo());
  protected todoForm = form(this.todoModel, todoSchema);
  protected isFormShowing = signal(true);
  protected isLoading = false;

  protected filterOptions = ['All', 'Active', 'Completed'];
  protected selectedFilter = signal<string>('All');
  protected searchQuery = signal<string>('');

  protected filteredTodos = computed(() => {
    if (this.selectedFilter() === 'All' && !this.searchQuery()) {
      return this.todos();
    }

    const searchQueries = this.searchQuery().trim().toLocaleLowerCase().split(' ');
    const isActive = this.selectedFilter() === 'Active';

    return this.todos().filter((x) =>
      searchQueries.every(
        (q) =>
          x.description.toLocaleLowerCase().includes(q) &&
          (x.isActive === isActive || this.selectedFilter() === 'All'),
      ),
    );
  });

  ngOnInit(): void {
    this.getTodos();
    this.onTodoAction();
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
      });
  }

  /**
   * onSubmit
   * @param e Event
   */
  protected onSubmit(e: Event): void {
    e.preventDefault();
    if (this.todoForm().invalid()) return;

    const newTodo: ITodo = { ...this.todoForm().value(), id: crypto.randomUUID() };

    this.apiTodosService
      .addTodo(newTodo)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.todos.update((todos) => [...todos, { ...res, isSelected: false }]);
        this.todoModel.set(createInitialTodo());
      });
  }

  /**
   * toggleForm
   */
  protected toggleForm(): void {
    this.isFormShowing.set(!this.isFormShowing());
  }

  /**
   * doneTodo
   * @param id string
   */
  private doneTodo(id: string): void {
    const todo = this.filteredTodos().find((x) => x.id === id);

    this.apiTodosService
      .updateTodo(todo!)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.todos.update((todos) =>
          todos.map((x) => (x.id === id ? { ...x, isActive: res.isActive } : x)),
        );
      });
  }

  /**
   * deleteTodo
   * @param id string
   */
  private deleteTodo(id: string): void {
    this.todos.update((todos) => todos.filter((x) => x.id !== id));
    this.apiTodosService.deleteTodo(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  /**
   * onTodoAction
   * delete or handle done todo based on the action type emitted from todo component
   */
  private onTodoAction(): void {
    this.todosService.todoAction$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((todo) => {
      if (todo.action === EnTodoAction.Done) {
        this.doneTodo(todo.id);
      } else if (todo.action === EnTodoAction.Delete) {
        this.deleteTodo(todo.id);
      }
    });
  }
}
