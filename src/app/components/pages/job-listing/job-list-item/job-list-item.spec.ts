import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListItem } from './job-list-item';
import { RouterModule } from '@angular/router';

describe('JobListItem', () => {
  let component: JobListItem;
  let fixture: ComponentFixture<JobListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobListItem, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(JobListItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('job', {
      id: 'test-job',
      title: 'Test Job',
      company: 'Test Company',
      location: 'Test Location',
      description: 'This is a test job description.',
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
