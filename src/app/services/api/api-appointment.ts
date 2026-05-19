import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppointment } from '../../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class ApiAppointment {
  private readonly baseUrl = 'http://localhost:3000/appointments';
  private readonly http = inject(HttpClient);

  /**
   * getAllAppointments
   * @returns Observable<IAppointment[]>
   */
  public getAllAppointments(): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(this.baseUrl);
  }

  /**
   * createAppointment
   * @param appointment IAppointment
   * @returns Observable<IAppointment>
   */
  public createAppointment(appointment: IAppointment): Observable<IAppointment> {
    return this.http.post<IAppointment>(this.baseUrl, appointment);
  }

  /**
   * updateAppointment
   * @param id number
   * @param appointment IAppointment
   * @returns Observable<IAppointment>
   */
  public updateAppointment(id: number, appointment: IAppointment): Observable<IAppointment> {
    return this.http.put<IAppointment>(`${this.baseUrl}/${id}`, appointment);
  }

  /**
   * deleteAppointment
   * @param id number
   * @returns Observable<IAppointment>
   */
  public deleteAppointment(id: number): Observable<IAppointment> {
    return this.http.delete<IAppointment>(`${this.baseUrl}/${id}`);
  }
}
