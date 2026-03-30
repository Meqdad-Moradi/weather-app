import { Component, input, model } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-filter-items',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatIcon],
  templateUrl: './filter-items.html',
  styleUrl: './filter-items.css',
})
export class FilterItems {
  public itemsCount = input<number>();
  public filterOptions = input<string[]>();
  public sortOptions = input<string[]>();
  public selectedFilter = model<string>();
  public selectedSort = model<string>();
  public searchQuery = model<string>('');
  public isSearchControlVisible = input.required<boolean>();
  public allDisabled = input<boolean>(false);

  /**
   * onFilterChange
   * @param filter MatSelectChange
   */
  protected onFilterChange(filter: MatSelectChange): void {
    this.selectedFilter.set(filter.value);
  }

  /**
   * onSortChange
   * @param sort MatSelectChange
   */
  protected onSortChange(sort: MatSelectChange): void {
    this.selectedSort.set(sort.value);
  }
}
