import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MainTitle } from '../../apps/main-title/main-title';
import { ApiJoblisting } from '../../../services/api/api-joblisting';
import { IJobListing } from '../../../models/job-listing.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JobListItem } from './job-list-item/job-list-item';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-job-listing',
  imports: [
    MainTitle,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    JobListItem,
  ],
  templateUrl: './job-listing.html',
  styleUrl: './job-listing.css',
})
export class JobListing implements OnInit {
  private readonly jobListingsService = inject(ApiJoblisting);
  private readonly destroyRef = inject(DestroyRef);

  private jobListings = signal<IJobListing[]>([]);

  public filteredJobListings = computed(() => this.jobListings());
  public isLoading = signal(false);
  public filterItems = signal<string[]>([]);

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

  /**
   * remove
   * remove selected item from filter
   * @param item string
   */
  public remove(item: string): void {
    this.filterItems.update((items) => {
      const index = items.indexOf(item);
      if (index < 0) {
        return items;
      }

      items.splice(index, 1);
      return [...items];
    });
  }

  /**
   * clearAll
   */
  public clearAll(): void {
    this.filterItems.set([]);
  }
}
