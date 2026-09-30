import { Injector, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { form } from '@angular/forms/signals';
import { disableMissingFields } from '../../../models/signal-form.model';

import { SignalForm } from './signal-form';

describe('SignalForm', () => {
  let component: SignalForm;
  let fixture: ComponentFixture<SignalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('disables model fields missing from metadata', () => {
    const model = signal({ firstName: '', lastName: '' });
    const testForm = form(
      model,
      (path) => disableMissingFields(path, ['firstName', 'lastName'], () => ['firstName']),
      { injector: TestBed.inject(Injector) },
    );

    expect(testForm.firstName().disabled()).toBe(false);
    expect(testForm.lastName().disabled()).toBe(true);
  });
});
