import { Component, inject, model, output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { EnTodoAction, ITodoResult, TodoAction } from '../../../../models/todo.model';
import { TodosService } from '../../../../services/todos-service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-todo',
  imports: [MatCheckbox, MatIcon, MatButtonModule, MatMenuModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  private todoService = inject(TodosService);

  public readonly todo = model.required<ITodoResult>();

  /**
   * toggleSelect
   */
  protected toggleSelect(): void {
    this.todo.update((value) => ({ ...value, isSelected: !this.todo().isSelected }));
  }

  /**
   * onDone
   * @param e Event
   */
  protected onDone(e: Event): void {
    e.stopPropagation();
    this.todoService.todoAction({ action: EnTodoAction.Done, id: this.todo().id });
  }

  /**
   * onDelete
   * @param e Event
   */
  protected onDelete(e: Event): void {
    e.stopPropagation();
    this.todoService.todoAction({ action: EnTodoAction.Delete, id: this.todo().id });
  }
}
