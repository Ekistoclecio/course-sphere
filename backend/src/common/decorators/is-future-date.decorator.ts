import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'isFutureDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean {
          if (typeof value !== 'string' && !(value instanceof Date)) {
            return false; // não é data
          }
          const dateValue = new Date(value);
          const now = new Date();
          return dateValue > now;
        },
      },
    });
  };
}
