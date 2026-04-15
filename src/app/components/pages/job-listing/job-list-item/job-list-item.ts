import { Component, input, output } from '@angular/core';
import { IJobListing } from '../../../../models/job-listing.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-job-list-item',
  imports: [MatIcon],
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
