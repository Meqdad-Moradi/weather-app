import { schema, required } from '@angular/forms/signals';

export interface IAppointment {
  id: string;
  customerName: string;
  date: Date | null;
  description: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}
  
export function createInitialAppointment(): IAppointment {
  return {
    id: '',
    customerName: '',
    date: null,
    status: 'scheduled',
    description: '',
  };
}

export const appointmentSchema = schema<IAppointment>((rootPath) => {
  required(rootPath.customerName, { message: "Customer name can't be empty" });
  required(rootPath.date, { message: "Date can't be empty" });
  required(rootPath.status, { message: "Status can't be empty" });
});
