import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJobListing } from '../../models/job-listing.model';

@Injectable({
  providedIn: 'root',
})
export class ApiJoblisting {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:3000/joblisting';

  /**
   * getJobListings
   * @returns Observable<IJoblisting[]>
   */
  public getJobListings(): Observable<IJobListing[]> {
    return this.http.get<IJobListing[]>(this.baseUrl);
  }
}
