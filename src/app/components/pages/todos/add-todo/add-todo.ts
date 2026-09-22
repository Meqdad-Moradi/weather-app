import { NgClass } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ITodo, todoSchema } from '../../../../models/todo.model';
import { TodosService } from '../../../../services/todos-service';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-todo',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgClass,
    FormField,
    FormRoot,
  ],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.css',
})
export class AddTodo {
  private readonly todosService = inject(TodosService);

  public readonly isFormSubmitting = input.required<boolean>();

  public submitForm = output<ITodo>();

  protected isFormShowing = computed(() => this.todosService.isFormShowing());

  protected clearDescription(): void {
    this.todosService.todoModel.update((model) => ({ ...model, description: '' }));
  }

  protected todoForm = form(this.todosService.todoModel, todoSchema, {
    submission: {
      action: async (field) => {
        try {
          const newTodo: ITodo = { ...field().value(), id: crypto.randomUUID() };
          this.submitForm.emit(newTodo);
          return;
        } catch (error) {
          return { kind: 'submissionError', message: 'Could not add todo' };
        }
      },
      onInvalid: (field) => {
        const errors = field().errorSummary();
        if (errors.length > 0) {
          const firstError = errors[0];
          firstError.fieldTree().focusBoundControl();
        }
      },
      ignoreValidators: 'none',
    },
  });

  // /**
  //  * onSubmit
  //  * @param e Event
  //  */
  // protected onSubmit(e: Event): void {
  //   e.preventDefault();
  //   if (this.todoForm().invalid()) return;

  //   const newTodo: ITodo = { ...this.todoForm().value(), id: crypto.randomUUID() };
  //   this.submitForm.emit(newTodo);
  // }
}
