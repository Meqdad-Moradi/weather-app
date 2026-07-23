import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosResult } from './todos-result';

describe('TodosResult', () => {
  let component: TodosResult;
  let fixture: ComponentFixture<TodosResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosResult],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosResult);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('isLoading', false);
    fixture.componentRef.setInput('todos', [
      { id: '1', title: 'Todo 1', completed: false },
      { id: '2', title: 'Todo 2', completed: true },
    ]);
    fixture.componentRef.setInput('todosLength', 2);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
