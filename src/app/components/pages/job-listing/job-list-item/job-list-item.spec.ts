import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListItem } from './job-list-item';

describe('JobListItem', () => {
  let component: JobListItem;
  let fixture: ComponentFixture<JobListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobListItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
