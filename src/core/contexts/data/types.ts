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

export type CrudOperators =
    | "eq"
    | "ne"
    | "lt"
    | "gt"
    | "lte"
    | "gte"
    | "in"
    | "nin"
    | "ina"
    | "nina"
    | "contains"
    | "ncontains"
    | "containss"
    | "ncontainss"
    | "between"
    | "nbetween"
    | "null"
    | "nnull"
    | "startswith"
    | "nstartswith"
    | "startswiths"
    | "nstartswiths"
    | "endswith"
    | "nendswith"
    | "endswiths"
    | "nendswiths"
    | "or"
    | "and";

export type LogicalFilter = {
    field: string;
    operator: Exclude<CrudOperators, "or" | "and">;
    value: any;
};

export type ConditionalFilter = {
    key?: string;
    operator: Extract<CrudOperators, "or" | "and">;
    value: (LogicalFilter | ConditionalFilter)[];
};

export type CrudFilter = LogicalFilter | ConditionalFilter;

export type CrudSort = {
    field: string;
    order: "asc" | "desc";
};
