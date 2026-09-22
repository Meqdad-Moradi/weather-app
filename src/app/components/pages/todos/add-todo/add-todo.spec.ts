import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodo } from './add-todo';

describe('AddTodo', () => {
  let component: AddTodo;
  let fixture: ComponentFixture<AddTodo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodo],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the description without submitting the form', () => {
    component['todosService'].todoModel.set({ id: '1', description: 'Buy milk', isActive: true });
    fixture.detectChanges();

    const clearButton = fixture.nativeElement.querySelector('button[matIconButton]');

    expect(clearButton).toBeTruthy();
    expect(clearButton.getAttribute('type')).toBe('button');

    clearButton.click();

    expect(component['todosService'].todoModel().description).toBe('');
  });
});
