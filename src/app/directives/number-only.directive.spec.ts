import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NumberOnlyDirective } from './number-only.directive';

@Component({
  template: '<input appNumberOnly />',
  imports: [NumberOnlyDirective],
})
class TestHost {}

describe('NumberOnlyDirective', () => {
  it('should remove non-numeric characters from input', () => {
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '12a34';
    input.setSelectionRange(3, 3);
    input.dispatchEvent(new Event('input', { bubbles: true }));

    expect(input.value).toBe('1234');
    expect(input.selectionStart).toBe(2);
  });
});
