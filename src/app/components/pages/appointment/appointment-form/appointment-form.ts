import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiAppointment } from '../../../../services/api/api-appointment';
import {
  appointmentSchema,
  createInitialAppointment,
  IAppointment,
} from '../../../../models/appointment.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { form, required, Field, FormField } from '@angular/forms/signals';

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
        (appointments) => (this.bookedDateAndTime = appointments.map((a) => new Date(a.date))),
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

  // /**
  //  * validateTime
  //  * @returns ValidatorFn
  //  */
  // private validateTime(): ValidatorFn {
  //   let errorMsg = '';

  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const selectedTime = new Date(control.value).toTimeString().slice(0, 5);

  //     if (this.bookedDateAndTime?.includes(selectedTime)) {
  //       errorMsg = 'This time slot is already booked.';
  //       return {
  //         errorMsg,
  //       };
  //     }
  //     return null;
  //   };
  // }

  /**
   * onSubmit
   */
  protected onSubmit(): void {
    if (this.appointmentForm().valid()) {
      this.apiAppointmentService
        .createAppointment(this.model())
        .pipe(take(1)) // unsbuscribe automatically
        .subscribe((res) => {
          this.snackbar.open('Appointment created successfully!', 'Close', { duration: 3000 });
          this.bookedDateAndTime.push(new Date(res.date));
          this.model.set(createInitialAppointment());
        });
    }
  }
}
