import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IJobListing } from '../../models/job-listing.model';

@Injectable({
  providedIn: 'root',
})
export class ApiJoblisting {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:3000/joblisting';

  public jobListings = signal<IJobListing[]>([]);

  /**
   * getJobListings
   * @returns Observable<IJoblisting[]>
   */
  public getJobListings(): Observable<IJobListing[]> {
    return this.http.get<IJobListing[]>(this.baseUrl);
  }
}
