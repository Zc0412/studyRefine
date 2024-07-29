import {QueryFunctionContext} from "@tanstack/react-query";

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

export interface QueryBuilderOptions {
    operation?: string;
    fields?: Fields;
    variables?: VariableOptions;
}

export type Fields = Array<string | object | NestedField>;

export type VariableOptions =
    | {
    type?: string;
    name?: string;
    value: any;
    list?: boolean;
    required?: boolean;
}
    | { [k: string]: any };

export type NestedField = {
    operation: string;
    variables: QueryBuilderOptions[];
    fields: Fields;
};

export type MetaQuery = {
    [k: string]: any;
    queryContext?: Omit<QueryFunctionContext, "meta">;
} & QueryBuilderOptions

export type BaseRecord = {
    id?: BaseKey;
    [key: string]: any;
};

export interface Pagination {
    /**
     * Initial page index
     * @default 1
     */
    current?: number;
    /**
     * Initial number of items per page
     * @default 10
     */
    pageSize?: number;
    /**
     * Whether to use server side pagination or not.
     * @default "server"
     */
    mode?: "client" | "server" | "off";
}

export interface GetListParams {
    resource: string;
    pagination?: Pagination;
    /**
     * @deprecated `hasPagination` is deprecated, use `pagination.mode` instead.
     */
    hasPagination?: boolean;
    /**
     * @deprecated `sort` is deprecated, use `sorters` instead.
     */
    sort?: CrudSort[];
    sorters?: CrudSort[];
    filters?: CrudFilter[];
    meta?: MetaQuery;
    /**
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
    dataProviderName?: string;
}

export interface GetManyParams {
    resource: string;
    ids: BaseKey[];
    meta?: MetaQuery;
    /**
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
    dataProviderName?: string;
}

export interface GetOneParams {
    resource: string;
    id: BaseKey;
    meta?: MetaQuery;
    /**
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
}

export interface CreateParams<TVariables = {}> {
    resource: string;
    variables: TVariables;
    meta?: MetaQuery;
    /**
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
}

export interface CreateManyParams<TVariables = {}> {
    resource: string;
    variables: TVariables[];
    meta?: MetaQuery;
    /**
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
}

export interface UpdateParams<TVariables = {}> {
    resource: string;
    id: BaseKey;
    variables: TVariables;
    meta?: MetaQuery;
    /**
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
}

export interface UpdateManyParams<TVariables = {}> {
    resource: string;
    ids: BaseKey[];
    variables: TVariables;
    meta?: MetaQuery;
    /**
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
}

export interface DeleteOneParams<TVariables = {}> {
    resource: string;
    id: BaseKey;
    variables?: TVariables;
    meta?: MetaQuery;
    /**
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
}

export interface DeleteManyParams<TVariables = {}> {
    resource: string;
    ids: BaseKey[];
    variables?: TVariables;
    meta?: MetaQuery;
    /**
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
}

export interface CustomParams<TQuery = unknown, TPayload = unknown> {
    url: string;
    method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
    /**
     * @deprecated `sort` is deprecated, use `sorters` instead.
     */
    sort?: CrudSort[];
    sorters?: CrudSort[];
    filters?: CrudFilter[];
    payload?: TPayload;
    query?: TQuery;
    headers?: {};
    meta?: MetaQuery;
    /**
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
}

export interface GetListResponse<TData = BaseRecord> {
    data: TData[];
    total: number;
    [key: string]: any;
}

export interface CreateResponse<TData = BaseRecord> {
    data: TData;
}

export interface CreateManyResponse<TData = BaseRecord> {
    data: TData[];
}

export interface UpdateResponse<TData = BaseRecord> {
    data: TData;
}

export interface UpdateManyResponse<TData = BaseRecord> {
    data: TData[];
}

export interface GetOneResponse<TData = BaseRecord> {
    data: TData;
}

export interface GetManyResponse<TData = BaseRecord> {
    data: TData[];
}

export interface DeleteOneResponse<TData = BaseRecord> {
    data: TData;
}

export interface DeleteManyResponse<TData = BaseRecord> {
    data: TData[];
}

export interface CustomResponse<TData = BaseRecord> {
    data: TData;
}

export type DataProvider = {
    getList: <TData extends BaseRecord = BaseRecord>(
        params: GetListParams,
    ) => Promise<GetListResponse<TData>>;

    getMany?: <TData extends BaseRecord = BaseRecord>(
        params: GetManyParams,
    ) => Promise<GetManyResponse<TData>>;

    getOne: <TData extends BaseRecord = BaseRecord>(
        params: GetOneParams,
    ) => Promise<GetOneResponse<TData>>;

    create: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
        params: CreateParams<TVariables>,
    ) => Promise<CreateResponse<TData>>;

    createMany?: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
        params: CreateManyParams<TVariables>,
    ) => Promise<CreateManyResponse<TData>>;

    update: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
        params: UpdateParams<TVariables>,
    ) => Promise<UpdateResponse<TData>>;

    updateMany?: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
        params: UpdateManyParams<TVariables>,
    ) => Promise<UpdateManyResponse<TData>>;

    deleteOne: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
        params: DeleteOneParams<TVariables>,
    ) => Promise<DeleteOneResponse<TData>>;

    deleteMany?: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
        params: DeleteManyParams<TVariables>,
    ) => Promise<DeleteManyResponse<TData>>;

    getApiUrl: () => string;

    custom?: <
        TData extends BaseRecord = BaseRecord,
        TQuery = unknown,
        TPayload = unknown,
    >(
        params: CustomParams<TQuery, TPayload>,
    ) => Promise<CustomResponse<TData>>;
};

export type DataProviders = {
    default: DataProvider;
    [key: string]: DataProvider;
};

export type IDataContext = DataProviders;
