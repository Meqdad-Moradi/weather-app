import { Component, signal } from '@angular/core';

import { createInitialTodo, ITodo, todoSchema } from '../../../models/todo.model';
import { form, FormField } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todos',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormField,
    MatCheckboxModule,
    MatButtonModule,
    NgClass,
  ],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos {
  protected todoModel = signal<ITodo>(createInitialTodo());
  protected todoForm = form(this.todoModel, todoSchema);
  protected isFormShowing = signal(false);

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
