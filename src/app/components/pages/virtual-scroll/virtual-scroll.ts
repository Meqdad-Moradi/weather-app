import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MainTitle } from '../../apps/main-title/main-title';
import { ApiVirtualScroll } from '../../../services/api/api-virtual-scroll';
import { IPhoto } from '../../../models/photos.model';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FilterItems } from "../../apps/filter-items/filter-items";

@Component({
  selector: 'app-virtual-scroll',
  imports: [MainTitle, ScrollingModule, MatButtonModule, MatIconModule, MatMenuModule, FilterItems],
  templateUrl: './virtual-scroll.html',
  styleUrl: './virtual-scroll.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualScroll implements OnInit {
  private readonly apiPhotosService = inject(ApiVirtualScroll);
  private readonly destroyRef = inject(DestroyRef);

  protected photos = signal<IPhoto[]>([]);

  ngOnInit(): void {
    this.apiPhotosService
      .getPhotos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((photos) => {
        console.log(photos);
        this.photos.set(photos);
      });
  }

  /**
   * print page
   */
  public printPage() {
    print();
  }
}
