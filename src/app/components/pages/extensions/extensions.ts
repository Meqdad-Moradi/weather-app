import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MainTitle } from '../../apps/main-title/main-title';
import { ApiExtensions } from '../../../services/api/api-extensions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IExtension, IFilterBtn } from '../../../models/extensions.model';
import { ExtensionCard } from './extension-card/extension-card';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-extensions',
  imports: [MainTitle, ExtensionCard, MatAnchor],
  templateUrl: './extensions.html',
  styleUrl: './extensions.css',
})
export class Extensions implements OnInit {
  private readonly apiExtensionsService = inject(ApiExtensions);
  private readonly dsRef = inject(DestroyRef);

  private extensions = signal<IExtension[]>([]);
  protected filteredExtensions = signal<IExtension[]>([]);
  protected filterBtns = signal<IFilterBtn[]>([
    {
      name: 'All',
      active: true,
    },
    {
      name: 'Active',
      active: false,
    },
    {
      name: 'Inactive',
      active: false,
    },
  ]);

  ngOnInit(): void {
    this.getExtensions();
  }

  /**
   * getExtensions
   */
  private getExtensions(): void {
    this.apiExtensionsService
      .getExtensions()
      .pipe(takeUntilDestroyed(this.dsRef))
      .subscribe((res) => {
        this.extensions.set(res);
        this.filteredExtensions.set(res);
      });
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
