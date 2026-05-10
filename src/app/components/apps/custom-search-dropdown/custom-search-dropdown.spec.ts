import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSearchDropdown } from './custom-search-dropdown';

describe('CustomSearchDropdown', () => {
  let component: CustomSearchDropdown;
  let fixture: ComponentFixture<CustomSearchDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSearchDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSearchDropdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
