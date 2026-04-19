import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTitle } from '../../apps/main-title/main-title';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CharacterCount } from '../../../models/character-counter.model';

@Component({
  selector: 'app-character-counter',
  imports: [
    CommonModule,
    FormsModule,
    MainTitle,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
  ],
  templateUrl: './character-counter.html',
  styleUrl: './character-counter.css',
})
export class CharacterCounter {
  protected text = signal<string>('');
  protected enteredChars = signal<CharacterCount[]>([]);

  /**
   * onInput
   * @param event Event
   */
  protected onInput(event: Event): void {
    event.preventDefault();
    this.characterCount();
  }

  /**
   * characterCount
   * Count the characters entered in the input field and update
   * the enteredChars signal with the count and percentage of each character.
   */
  private characterCount(): void {
    const splitedText: string[] = this.text().trim().split('');

    // count entered characters
    const charCounts: { [key: string]: number } = {};
    splitedText.forEach((char) => {
      charCounts[char] = (charCounts[char] || 0) + 1;
    });

    const totalChars = splitedText.length;
    this.enteredChars.set(
      Object.entries(charCounts).map(([char, count]) => ({
        char,
        count,
        percenter: (count / totalChars) * 100,
      })),
    );
  }
}
