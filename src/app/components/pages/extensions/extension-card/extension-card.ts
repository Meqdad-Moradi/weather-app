import { Component, model, output } from '@angular/core';
import { IExtension } from '../../../../models/extensions.model';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-extension-card',
  imports: [MatButtonModule, MatSlideToggleModule, FormsModule],
  templateUrl: './extension-card.html',
  styleUrl: './extension-card.css',
})
export class ExtensionCard {
  readonly extension = model.required<IExtension>();

  protected toggleActive = output<IExtension>();
  protected remove = output<string>();

  /**
   * onToggleActive
   */
  protected onToggleActive(): void {
    this.toggleActive.emit(this.extension());
  }

  /**
   * onRemove
   */
  protected onRemove(): void {
    this.remove.emit(this.extension().id);
  }
}
