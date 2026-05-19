import { Component } from '@angular/core';
import { MainTitle } from "../../apps/main-title/main-title";
import { AppointmentForm } from "./appointment-form/appointment-form";

@Component({
  selector: 'app-appointment',
  imports: [MainTitle, AppointmentForm],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css',
})
export class Appointment {

}
