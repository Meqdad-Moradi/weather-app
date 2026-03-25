import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExtension } from '../../models/extensions.model';

@Injectable({
  providedIn: 'root',
})
export class ApiExtensions {
  private readonly extensionsUrl = 'http://localhost:3000/extensions';
  private readonly http = inject(HttpClient);

  /**
   * getExtensions
   * @returns Observable<IExtension[]>
   */
  public getExtensions(): Observable<IExtension[]> {
    return this.http.get<IExtension[]>(this.extensionsUrl);
  }
}
