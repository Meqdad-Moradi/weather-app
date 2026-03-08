import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSearch } from './custom-search';

describe('CustomSearch', () => {
  let component: CustomSearch;
  let fixture: ComponentFixture<CustomSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
