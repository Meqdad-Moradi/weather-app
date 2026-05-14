import { Component, input, model, viewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomSearchDropdown } from '../custom-search-dropdown/custom-search-dropdown';

@Component({
  selector: 'app-filter-items',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    MatIcon,
    FormsModule,
    CustomSearchDropdown,
  ],
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

  public control = new FormControl<string>('', { nonNullable: true });

  private filterSelect = viewChild<MatSelect>('filterSelect');

  /**
   * onFilterChange
   * @param filter MatSelectChange
   */
  protected onFilterChange(filter: MatSelectChange): void {
    this.selectedFilter.set(filter.value);
    this.control.setValue('');
  }

  /**
   * onSortChange
   * @param sort MatSelectChange
   */
  protected onSortChange(sort: MatSelectChange): void {
    this.selectedSort.set(sort.value);
  }

  /**
   * onOptionSelected
   * when an option of the mat-autocomplete is selected,
   * this method will be called to close the mat-select dropdown
   */
  protected onOptionSelected(): void {
    const selectedValue = this.control.value;

    if (selectedValue) {
      this.selectedFilter.set(selectedValue);
    }

    this.filterSelect()?.close();
  }
}
