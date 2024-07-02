export type BaseKey = string | number;

export type RefineError = HttpError;

export interface HttpError extends Record<string, any> {
  message: string;
  statusCode: number;
  errors?: ValidationErrors;
}

export interface ValidationErrors {
  [field: string]:
    | string
    | string[]
    | boolean
    | { key: string; message: string };
}
