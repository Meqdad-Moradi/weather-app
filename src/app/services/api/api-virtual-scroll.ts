import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPhoto } from '../../models/photos.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiVirtualScroll {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/photos';

  private http = inject(HttpClient);

  /**
   * getPhotos
   * @returns Observable<IPhoto[]>
   */
  public getPhotos(): Observable<IPhoto[]> {
    return this.http.get<IPhoto[]>(this.baseUrl);
  }
}
