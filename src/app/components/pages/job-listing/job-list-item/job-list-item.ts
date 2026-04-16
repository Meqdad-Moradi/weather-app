import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IJobListing } from '../../../../models/job-listing.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-job-list-item',
  imports: [MatIconModule, RouterLink],
  templateUrl: './job-list-item.html',
  styleUrl: './job-list-item.css',
})
export class JobListItem {
  public job = input.required<IJobListing>();

  public setFilter = output<string>();

  /**
   * onSetFilter
   * @param item string - language or tool to filter by
   */
  public onSetFilter(item: string): void {
    this.setFilter.emit(item);
  }
}
