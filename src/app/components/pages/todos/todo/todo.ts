import { Component, model } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { ITodoResult } from '../../../../models/todo.model';

@Component({
  selector: 'app-todo',
  imports: [MatCheckbox, MatIcon, MatButtonModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  public readonly todo = model.required<ITodoResult>();

  /**
   * toggleSelect
   */
  protected toggleSelect(): void {
    this.todo.update((value) => ({ ...value, isSelected: !this.todo().isSelected }));
  }
}
