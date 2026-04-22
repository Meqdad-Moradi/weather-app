import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-character-count-card',
  imports: [CommonModule],
  templateUrl: './character-count-card.html',
  styleUrl: './character-count-card.css',
})
export class CharacterCountCard {
  public backgroundColor = input.required<string>();
  public text = input.required<string>();
  public count = input.required<number>();
}
