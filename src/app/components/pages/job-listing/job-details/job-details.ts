import {
  Component,
  ChangeDetectionStrategy,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IJobListing, IJobListingDetailInfo } from '../../../../models/job-listing.model';
import { ApiJoblisting } from '../../../../services/api/api-joblisting';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-job-details',
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobDetails implements OnInit {
  private readonly apiJobListingsService = inject(ApiJoblisting);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly snackBar = inject(MatSnackBar);

  public job = signal<IJobListing | null>(null);
  public jobDetailInfo = signal<IJobListingDetailInfo | null>(null);

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const jobId = params.get('id');
      if (jobId && !isNaN(parseInt(jobId, 10))) {
        this.loadJobDetails(parseInt(jobId, 10));
      } else {
        this.job.set(null);
        this.jobDetailInfo.set(null);
      }
    });
  }

  /**
   * loadJobDetails
   * Load job details from API
   * @param jobId number - Job ID to load
   */
  private loadJobDetails(jobId: number): void {
    const selectedJob = this.apiJobListingsService
      .jobListings()
      .find((job) => Number(job.id) === jobId);

    if (selectedJob) {
      this.job.set(selectedJob);
      this.generateDetailInfo(selectedJob);
    } else {
      this.job.set(null);
      this.jobDetailInfo.set(null);
    }
  }

  /**
   * generateDetailInfo
   * Generate detail information based on job data
   * @param job IJobListing - Job data to generate details from
   */
  private generateDetailInfo(job: IJobListing): void {
    const levelDescription: Record<string, string> = {
      Junior:
        'We are looking for an enthusiastic junior professional to start their career journey.',
      Midweight: 'We seek a mid-level professional with solid experience and technical growth.',
      Senior: 'We need an experienced professional to lead initiatives and mentor the team.',
    };

    const roleDescription: Record<string, string> = {
      Frontend: 'responsible for building responsive user interfaces and client-side logic.',
      Backend: 'responsible for developing server-side logic, databases, and APIs.',
      Fullstack: 'responsible for both frontend and backend development across the stack.',
    };

    const details = {
      description: `We're seeking a ${job.level} ${job.role} Developer to join our team. ${levelDescription[job.level] || 'Join our innovative team.'} You will be ${roleDescription[job.role] || 'contributing to our projects'}.`,
      responsibilities: [
        `Develop and maintain ${job.contract.toLowerCase()} ${job.role.toLowerCase()} components`,
        `Work with ${job.languages.join(', ')} to build robust solutions`,
        `Collaborate with the team using ${job.tools.join(', ')}`,
        'Participate in code reviews and knowledge sharing sessions',
        'Troubleshoot and optimize application performance',
        'Contribute to best practices and coding standards',
      ],
      requirements: [
        `Experience with ${job.languages.join(', ')}`,
        `Proficiency in ${job.tools.join(', ')}`,
        `${job.level} level understanding of ${job.role} development`,
        'Knowledge of responsive design and modern web standards',
        'Problem-solving skills and attention to detail',
        'Strong communication and teamwork abilities',
        `${job.contract} availability for ${job.location}`,
      ],
      benefits: [
        'Competitive salary package',
        'Professional growth opportunities',
        `${job.contract} employment with flexible arrangements`,
        'Collaborative work environment',
        'Modern tech stack and tools',
        'Performance incentives',
        `Based in ${job.location} or remote opportunities`,
      ],
      about: `${job.company} is hiring for a ${job.level} ${job.role} Developer position. This is a ${job.contract.toLowerCase()} role based in ${job.location}. We're committed to innovation and excellence in software development.`,
    };

    this.jobDetailInfo.set(details);
  }

  /**
   * goBack
   * Navigate back to job listing
   */
  public goBack(): void {
    this.router.navigate(['/joblisting']);
  }

  /**
   * applyNow
   * Handle job application
   */
  public applyNow(): void {
    this.snackBar.open(
      'Thank you for your interest! Application submitted successfully.',
      'Close',
      { duration: 3000 },
    );
  }
}
