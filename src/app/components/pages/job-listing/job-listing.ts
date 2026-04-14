import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MainTitle } from '../../apps/main-title/main-title';
import { ApiJoblisting } from '../../../services/api/api-joblisting';
import { IJobListing } from '../../../models/job-listing.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-job-listing',
  imports: [MainTitle, MatProgressSpinnerModule],
  templateUrl: './job-listing.html',
  styleUrl: './job-listing.css',
})
export class JobListing implements OnInit {
  private readonly jobListingsService = inject(ApiJoblisting);
  private readonly destroyRef = inject(DestroyRef);

  private jobListings = signal<IJobListing[]>([]);

  public filteredJobListings = computed(() => this.jobListings());
  public isLoading = signal(false);

  ngOnInit(): void {
    this.getJobListings();
  }

  /**
   * getJobListings
   */
  private getJobListings(): void {
    this.isLoading.set(true);

    this.jobListingsService
      .getJobListings()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((listings) => {
        this.isLoading.set(false);
        this.jobListings.set(listings);
      });
  }
}
