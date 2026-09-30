import { disabled, required, SchemaPath, SchemaPathTree } from '@angular/forms/signals';

export interface SignalFormModel {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// T is the model type inferred (استنباط شده) from the schema path. In this form,
// schemaPath is typed as SchemaPathTree<SignalFormModel>, so inside disableMissingFields(...), T is SignalFormModel.
// K is each property key of T. The mapped type uses it to pair each key with that field’s schema path:

// For SignalFormModel, K iterates over "lastName", "firstName", "email", "password", and "confirmPassword".
// You pass the schemaPath from the form() schema callback, not a SignalFormModel value; the model type is inferred
// through that path.

/**
 * Maps each model key to the Signal Forms schema path for that field's value.
 */
type FieldPaths<T extends object> = {
  [K in keyof T & string]: SchemaPath<T[K]>;
};

/**
 * disableMissingFields
 * @param path SchemaPathTree<T>
 * @param modelKeys readonly (keyof T & string)[]
 * @param metadata () => string[]
 * @param isNewRegistration boolean = false
 */
export function disableMissingFields<T extends object>(
  path: SchemaPathTree<T>,
  modelKeys: readonly (keyof T & string)[],
  metadata: () => string[],
  isNewRegistration = false,
): void {
  const fields = path as FieldPaths<T>;
  const metadataLower = metadata().map((x) => x.toLocaleLowerCase());

  modelKeys.forEach((key) =>
    disabled(fields[key], {
      when: () => !isNewRegistration && !metadataLower.includes(key.toLocaleLowerCase()),
    }),
  );
}

/**
 * handleRequiredFields
 * @param path SchemaPathTree<T>
 * @param keys readonly (keyof T & string)[]
 */
export function handleRequiredFields<T extends object>(
  path: SchemaPathTree<T>,
  keys: readonly (keyof T & string)[],
): void {
  const fields = path as FieldPaths<T>;
  keys.forEach((key) => required(fields[key], { message: "Can't be blank!" }));
}
