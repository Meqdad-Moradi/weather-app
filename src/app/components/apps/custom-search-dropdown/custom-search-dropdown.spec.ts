import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSearchDropdown } from './custom-search-dropdown';
import { FormControl } from '@angular/forms';

describe('CustomSearchDropdown', () => {
  let component: CustomSearchDropdown;
  let fixture: ComponentFixture<CustomSearchDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSearchDropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSearchDropdown);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('control', new FormControl(''));
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
