export interface Appointment {
  id: number;
  customerName: string;
  date: string; // ISO format: 2025-01-20
  time: string; // HH:mm
  description?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface AppointmentDto {
  customerName: string;
  date: string;
  time: string;
  description?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}
