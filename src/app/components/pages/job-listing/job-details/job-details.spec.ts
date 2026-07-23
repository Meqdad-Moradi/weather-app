import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetails } from './job-details';
import { RouterModule } from '@angular/router';

describe('JobDetails', () => {
  let component: JobDetails;
  let fixture: ComponentFixture<JobDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobDetails, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(JobDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
