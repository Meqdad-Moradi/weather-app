import { Directive } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]',
  host: {
    '(input)': 'onInput($event)', // Runs the handler whenever the host element's value changes.
  },
})
export class NumberOnlyDirective {
  protected onInput(event: Event): void {
    const input = event.target as HTMLInputElement; // Gets the input that emitted the event.
    const numericValue = input.value.replace(/\D/g, ''); // Removes every non-digit character.

    if (input.value === numericValue) return; // Avoids extra work when the value is already numeric.

    const cursorPosition = input.selectionStart ?? input.value.length; // Saves the caret position before cleaning.
    const numericCursorPosition = input.value.slice(0, cursorPosition).replace(/\D/g, '').length; // Counts digits before the caret.
    input.value = numericValue; // Shows the cleaned value in the input.
    input.setSelectionRange(numericCursorPosition, numericCursorPosition); // Restores the caret after removed characters.

    input.dispatchEvent(new Event('input', { bubbles: true })); // Notifies form bindings of the cleaned value.
  }
}
