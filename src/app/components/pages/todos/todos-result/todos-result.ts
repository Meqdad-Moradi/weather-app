import { Component, computed, input, model } from '@angular/core';

import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ITodoResult } from '../../../../models/todo.model';
import { Todo } from '../todo/todo';
import { FilterItems } from '../../../apps/filter-items/filter-items';

@Component({
  selector: 'app-todos-result',
  imports: [MatProgressSpinnerModule, Todo, MatCheckbox, FilterItems],
  templateUrl: './todos-result.html',
  styleUrl: './todos-result.css',
})
export class TodosResult {
  public readonly isLoading = input.required<boolean>();
  public readonly todos = model.required<ITodoResult[]>();
  public readonly filterOptions = input<string[]>([]);
  public readonly selectedFilter = model<string>();
  public readonly searchQuery = model<string>('');
  public readonly isSearchControlVisible = input<boolean>();
  public readonly todosLength = input.required<number>();

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
