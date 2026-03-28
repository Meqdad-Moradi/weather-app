import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosResult } from './todos-result';

describe('TodosResult', () => {
  let component: TodosResult;
  let fixture: ComponentFixture<TodosResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
