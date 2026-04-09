import { NgClass } from '@angular/common';
import { Component, computed, inject, output } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ITodo, todoSchema } from '../../../../models/todo.model';
import { TodosService } from '../../../../services/todos-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-todo',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, NgClass, FormField],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.css',
})
export class AddTodo {
  private readonly todosService = inject(TodosService);

  public submitForm = output<ITodo>();

  protected isFormShowing = computed(() => this.todosService.isFormShowing());
  protected todoForm = form(this.todosService.todoModel, todoSchema);

  /**
   * onSubmit
   * @param e Event
   */
  protected onSubmit(e: Event): void {
    e.preventDefault();
    if (this.todoForm().invalid()) return;

    const newTodo: ITodo = { ...this.todoForm().value(), id: crypto.randomUUID() };
    this.submitForm.emit(newTodo);
  }
}
