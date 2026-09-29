import { maxLength, minLength, required, SchemaPathTree } from '@angular/forms/signals';

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  id?: string;
  // address: Address[];
}

interface Address {
  city: string;
  zip: string;
}

export function validateAddress(schema: SchemaPathTree<Address>) {
  required(schema.zip, { message: "Can't be blank!" });
  required(schema.city, { message: "Can't be blank!" });
  minLength(schema.zip, 2, { message: 'Min. 2 digits please!' });
  maxLength(schema.zip, 5, { message: 'Min. 5 digits please!' });
}
