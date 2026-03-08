import { Component, input } from '@angular/core';

@Component({
  selector: 'app-main-title',
  imports: [],
  templateUrl: './main-title.html',
  styleUrl: './main-title.css',
})
export class MainTitle {
  readonly title = input.required<string>();
}
