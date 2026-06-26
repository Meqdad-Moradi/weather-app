import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { take } from 'rxjs/operators';
import {
  appointmentSchema,
  createInitialAppointment,
  IAppointment,
} from '../../../../models/appointment.model';
import { ApiAppointment } from '../../../../services/api/api-appointment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatTimepickerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    FormField,
  ],
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentForm implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly apiAppointmentService = inject(ApiAppointment);
  private readonly snackbar = inject(MatSnackBar);

  private readonly model = signal<IAppointment>(createInitialAppointment());

  protected appointmentForm = form(this.model, appointmentSchema);

  private bookedDateAndTime: Date[] = [];
  protected currentDate = new Date();

  ngOnInit(): void {
    this.getAllAppointments();
  }

  /**
   * getAllAppointments
   */
  private getAllAppointments(): void {
    this.apiAppointmentService
      .getAllAppointments()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (appointments) => (this.bookedDateAndTime = appointments.map((a) => new Date(a.date!))),
      );
  }

  /**
   * dateFilter
   * disable weekends and booked dates
   * @param d Date | null
   * @returns boolean
   */
  protected dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // disable weekends and the past dates
    return day !== 0 && day !== 6 && d?.getTime()! > new Date().getTime();
  };

  /**
   * onSubmit
   */
  protected onSubmit(): void {
    if (this.appointmentForm().invalid()) return;
    console.log(this.model());
    this.apiAppointmentService
      .createAppointment(this.model())
      .pipe(take(1)) // unsbuscribe automatically
      .subscribe((res) => {
        this.snackbar.open('Appointment created successfully!', 'Close', { duration: 3000 });
        this.bookedDateAndTime.push(new Date(res.date!));
        this.model.set(createInitialAppointment());
      });
  }
}
