import { Component, computed, input, model } from '@angular/core';

import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ITodoResult } from '../../../../models/todo.model';
import { Todo } from '../todo/todo';

@Component({
  selector: 'app-todos-result',
  imports: [MatProgressSpinnerModule, Todo, MatCheckbox],
  templateUrl: './todos-result.html',
  styleUrl: './todos-result.css',
})
export class TodosResult {
  public readonly isLoading = input.required<boolean>();
  public readonly todos = model.required<ITodoResult[]>();

  protected todosLength = computed(() => this.todos().length);
  private countSelected = computed(() => this.todos().filter((x) => x.isSelected).length);

  protected allSelected = computed(
    () => this.countSelected() === this.todosLength() && this.countSelected() > 0,
  );
  protected isIndeterminate = computed(
    () => this.todosLength() !== this.countSelected() && this.countSelected() > 0,
  );

  /**
   * onChange
   * @param e MatCheckboxChange
   */
  protected onChange(e: MatCheckboxChange): void {
    const checked = e.checked;
    this.todos.update((todos) => todos.map((x) => ({ ...x, isSelected: checked })));
  }

  /**
   * onTodoChange
   * @param todo ITodoResult
   */
  protected onTodoChange(todo: ITodoResult): void {
    this.todos.update((currentTodos) => currentTodos.map((x) => (x.id === todo.id ? todo : x)));
  }
}
