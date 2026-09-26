import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLinkedSignal } from './test-linked-signal';

describe('TestLinkedSignal', () => {
  let component: TestLinkedSignal;
  let fixture: ComponentFixture<TestLinkedSignal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestLinkedSignal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestLinkedSignal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
