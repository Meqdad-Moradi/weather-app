import { Component, Directive } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ApiExtensions } from '../services/api/api-extensions';
import { IExtension } from '../models/extensions.model';
import { BaseEntry } from './base-entry';

@Component({
  template: '<div appTestBaseEntry></div>',
})
class TestHostComponent {}

@Directive({ selector: '[appTestBaseEntry]' })
class TestBaseEntry extends BaseEntry<IExtension> {
  protected getExtensions() {
    return of([
      {
        id: 'test-1',
        name: 'Test Extension',
        description: 'A test extension',
        logo: 'test-logo',
        isActive: true,
      },
    ]);
  }

  public getExtensionsValue() {
    return this.extensions();
  }

  public getFilteredExtensionsValue() {
    return this.filteredExtensions();
  }
}

describe('BaseEntry', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: TestBaseEntry;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, TestBaseEntry],
      providers: [{ provide: ApiExtensions, useValue: { getExtensions: () => of([]) } }],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    directive = fixture.debugElement.query(By.directive(TestBaseEntry)).injector.get(TestBaseEntry);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should initialize extensions when change detection runs', () => {
    fixture.detectChanges();

    expect(directive.getExtensionsValue()).toEqual([
      expect.objectContaining({ id: 'test-1', name: 'Test Extension' }),
    ]);
    expect(directive.getFilteredExtensionsValue()).toEqual(directive.getExtensionsValue());
  });
});
