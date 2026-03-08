import { Component, model } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-custom-search',
  imports: [MatIcon],
  templateUrl: './custom-search.html',
  styleUrl: './custom-search.css',
})
export class CustomSearch {
  public searchQuery = model.required<string>();
}
