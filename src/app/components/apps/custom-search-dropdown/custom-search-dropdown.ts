import { Component, input, OnInit, output, signal } from '@angular/core';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { ALL_COUNTRIES } from '../../../models/todo.model';

@Component({
  selector: 'app-custom-search-dropdown',
  imports: [FormsModule, ReactiveFormsModule, MatAutocompleteModule],
  templateUrl: './custom-search-dropdown.html',
  styleUrl: './custom-search-dropdown.css',
})
export class CustomSearchDropdown implements OnInit {
  readonly control = input.required<FormControl<string>>();
  readonly label = input.required<string>();

  readonly optionSelected = output<string>();

  protected countries = signal<string[]>([]);

  ngOnInit(): void {
    this.countries.set(ALL_COUNTRIES);
  }

  /**
   * onOptionSelected
   * @param e MatAutocompleteSelectedEvent
   */
  protected onOptionSelected(e: MatAutocompleteSelectedEvent): void {
    this.optionSelected.emit(e.option.value);
  }
}
