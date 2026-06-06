import { schema, required } from '@angular/forms/signals';

export interface IAppointment {
  id: string;
  customerName: string;
  date: Date;
  description?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface IAppointmentDto {
  customerName: string;
  date: string;
  time: string;
  description?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export function createInitialAppointment(): IAppointment {
  return {
    id: '',
    customerName: '',
    date: new Date(),
    description: '',
    status: 'scheduled',
  };
}

export const appointmentSchema = schema<IAppointment>((rootPath) => {
  required(rootPath.customerName, { message: "Customer name can't be empty" });
  required(rootPath.date, { message: "Date can't be empty" });
  required(rootPath.status, { message: "Status can't be empty" });
});
