import { ZodError, ZodSchema } from "zod";

export function validateData<T>(schema: ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors
        .map((err) => {
          const fieldPath = err.path.join(".");
          return fieldPath ? `${fieldPath} - ${err.message}` : `${err.message}`;
        })
        .join("; ");

      throw new Error(`Invalid data: ${errorMessage}`);
    } else {
      throw error;
    }
  }
}
