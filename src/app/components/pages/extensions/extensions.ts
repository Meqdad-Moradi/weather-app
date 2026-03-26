import { Component, OnInit } from '@angular/core';
import { MainTitle } from '../../apps/main-title/main-title';
import { IExtension } from '../../../models/extensions.model';
import { ExtensionCard } from './extension-card/extension-card';
import { MatAnchor } from '@angular/material/button';
import { BaseEntry } from '../../../directives/base-entry';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-extensions',
  imports: [MainTitle, ExtensionCard, MatAnchor],
  templateUrl: './extensions.html',
  styleUrl: './extensions.css',
})
export class Extensions extends BaseEntry<IExtension> implements OnInit {
  /**
   * getExtensions
   * @returns Observable<IExtension[]>
   */
  protected getExtensions(): Observable<IExtension[]> {
    return this.apiExtensionsService.getExtensions();
  }

  /**
   * onFilter
   * @param name string - button name
   */
  protected onFilter(name: string): void {
    this.filterBtns.update((btns) =>
      btns.map((btn) => ({
        ...btn,
        active: btn.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
      })),
    );

    const filterKey = name.toLocaleLowerCase();

    this.filteredExtensions.update(() => {
      const extensions = this.extensions();

      if (filterKey === 'all') return extensions;

      const isActive = filterKey === 'active';
      return extensions.filter((x) => x.isActive === isActive);
    });
  }

  /**
   * onToggleActive
   * @param ext IExtension
   */
  protected onToggleActive(ext: IExtension): void {
    this.filteredExtensions.update((values) =>
      values.map((x) => (x.id.toLocaleLowerCase() === ext.id.toLocaleLowerCase() ? ext : x)),
    );
    this.onFilter('all');
  }

  /**
   * onRemove
   * @param id string
   */
  protected onRemove(id: string): void {
    this.filteredExtensions.update((values) =>
      values.filter((x) => x.id.toLocaleLowerCase() !== id.toLocaleLowerCase()),
    );
  }
}
