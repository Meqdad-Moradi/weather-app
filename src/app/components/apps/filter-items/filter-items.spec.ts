import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterItems } from './filter-items';

describe('FilterItems', () => {
  let component: FilterItems;
  let fixture: ComponentFixture<FilterItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterItems);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
