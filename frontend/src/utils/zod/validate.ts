import { ZodSchema, ZodError } from 'zod';

export const zodValidate = <T>(data: unknown, schema: ZodSchema<T>): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ZodError(result.error.errors);
  }

  return result.data;
};
