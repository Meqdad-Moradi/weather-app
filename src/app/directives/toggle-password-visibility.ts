import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appTogglePasswordVisibility]',
})
export class TogglePasswordVisibility {
  private inputElement = inject(ElementRef);

  public appTogglePasswordVisibility = input<boolean>(false);

  constructor() {
    effect(() => {
      if (this.appTogglePasswordVisibility()) {
        this.inputElement.nativeElement.type = 'text';
      } else {
        this.inputElement.nativeElement.type = 'password';
      }
    });
  }
}
