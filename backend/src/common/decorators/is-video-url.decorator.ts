import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsVideoUrl(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isVideoUrl',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\//.test(
            value,
          );
        },
      },
    });
  };
}
