import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MainTitle } from "../../apps/main-title/main-title";

@Component({
  selector: 'app-signal-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MainTitle],
  templateUrl: './signal-form.html',
  styleUrl: './signal-form.css',
})
export class SignalForm {}
