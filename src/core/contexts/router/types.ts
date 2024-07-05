import {BaseKey, CrudFilter, CrudSort} from "../data/types.ts";
import {IResourceItem} from "../resource/types.ts";

export type Action = "create" | "edit" | "list" | "show" | "clone";

export type GoConfig = {
    to?: string;
    query?: Record<string, unknown>;
    hash?: string;
    options?: {
        keepQuery?: boolean;
        keepHash?: boolean;
    };
    type?: "push" | "replace" | "path";
};

export type ParsedParams<
    TParams extends Record<string, any> = Record<string, any>,
> = {
    filters?: CrudFilter[];
    sorters?: CrudSort[];
    current?: number;
    pageSize?: number;
} & TParams;

export type ParseResponse<
    TParams extends Record<string, any> = Record<string, any>,
> = {
    params?: ParsedParams<TParams>;
    resource?: IResourceItem;
    id?: BaseKey;
    action?: Action;
    pathname?: string;
};

export type GoFunction = (config: GoConfig) => void | string;

export type BackFunction = () => void;

export type ParseFunction<
    TParams extends Record<string, any> = Record<string, any>,
> = () => ParseResponse<TParams>;

export type RouterProvider = {
    go?: () => GoFunction;
    back?: () => BackFunction;
    parse?: () => ParseFunction;
    Link?: React.ComponentType<
        React.PropsWithChildren<{ to: string; [prop: string]: any }>
    >;
};

