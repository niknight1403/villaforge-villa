import { z } from 'zod';

export class ApiError extends Error {
  constructor(public status: number, message: string, public details?: unknown) {
    super(message);
    this.name = 'ApiError';
  }
}

export const safeParse = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ApiError(422, 'Validation failed', result.error.format());
  }
  return result.data;
};

export const handleApiError = (error: unknown): { status: number; message: string } => {
  if (error instanceof ApiError) {
    return { status: error.status, message: error.message };
  }
  if (error instanceof z.ZodError) {
    return { status: 422, message: 'Invalid request payload' };
  }
  return { status: 500, message: 'Internal server error' };
};