import { TestBed } from '@angular/core/testing';

import { ApiTodos } from './api-todos';

describe('ApiTodos', () => {
  let service: ApiTodos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTodos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
