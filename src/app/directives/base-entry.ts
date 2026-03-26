import { DestroyRef, Directive, inject, signal } from '@angular/core';
import { ApiExtensions } from '../services/api/api-extensions';
import { IExtension, IFilterBtn } from '../models/extensions.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appBaseEntry]',
})
export abstract class BaseEntry<T extends IExtension> {
  protected readonly apiExtensionsService = inject(ApiExtensions);
  protected readonly destroyRef = inject(DestroyRef);

  protected extensions = signal<T[]>([]);
  protected filteredExtensions = signal<T[]>([]);
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
    this.getExtensionsData();
  }

  /**
   * getExtensions
   */
  protected getExtensionsData(): void {
    this.getExtensions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.extensions.set(res);
        this.filteredExtensions.set(res);
      });
  }

  /**
   * getExtensions
   */
  protected abstract getExtensions(): Observable<T[]>;
}
