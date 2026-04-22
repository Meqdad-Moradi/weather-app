import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTitle } from '../../apps/main-title/main-title';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CharacterCount } from '../../../models/character-counter.model';
import { CharacterCountCard } from './character-count-card/character-count-card';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-character-counter',
  imports: [
    CommonModule,
    FormsModule,
    MainTitle,
    CharacterCountCard,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './character-counter.html',
  styleUrl: './character-counter.css',
})
export class CharacterCounter {
  protected text = signal<string>('');
  protected excludeSpaces = signal<boolean>(false);
  protected setCharacterLimit = signal<boolean>(false);
  protected characterLimit = signal<number>(10);
  protected enteredChars = signal<CharacterCount[]>([]);

  /**
   * totalChars
   * Count the total number of characters in the input text by calculating
   * the length of the text string. If excludeSpaces is true, spaces are filtered out.
   * The count is returned as the total number of characters entered by the user.
   * @returns total number of characters in the input text
   */
  protected totalChars = computed(() => {
    const currentText = this.text();
    if (this.excludeSpaces()) {
      return currentText.replace(/\s/g, '').length;
    }
    return currentText.length;
  });

  /**
   * wordCount
   * Count the number of words in the input text by splitting the text
   * using whitespace characters. It filters out any empty strings resulting
   * from multiple spaces or leading/trailing spaces. The final count is
   * returned as the number of words.
   * @returns number of words in the input text
   */
  protected wordCount = computed(() => {
    const text = this.text().trim();
    return text ? text.split(/\s+/).length : 0;
  });

  /**
   * approxReadingTime
   * Calculate the approximate reading time based on average reading speed
   * of 200 words per minute. This gives users an estimate of how long it
   * would take to read the entered text.
   * @returns approximate reading time in minutes (2 decimal places)
   */
  protected approxReadingTime = computed(() => {
    const words = this.wordCount();
    return Math.max(0, words / 200);
  });

  /**
   * sentenceCount
   * Count the number of sentences in the input text by splitting the text
   * using common sentence-ending punctuation marks (., !, ?). It filters out
   * any empty strings resulting from consecutive punctuation or leading/trailing
   * punctuation. The final count is returned as the number of sentences.
   * @returns number of sentences in the input text
   */
  protected sentenceCount = computed(() => {
    const text = this.text().trim();
    return text ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  });

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
   * If excludeSpaces is enabled, spaces are not included in the count.
   */
  private characterCount(): void {
    let splitedText: string[] = this.text()
      .trim()
      .split('')
      .filter((char) => char !== '\n'); // Filter out newlines

    // Filter out spaces if excludeSpaces is enabled
    if (this.excludeSpaces()) {
      splitedText = splitedText.filter((char) => char !== ' ');
    }

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
        percenter: totalChars > 0 ? (count / totalChars) * 100 : 0,
      })),
    );
  }
}
