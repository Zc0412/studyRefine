import {useKeys} from "../../useKeys";
import {useAuthBindingsContext} from "../../../contexts/auth";
import {useQuery, UseQueryOptions, UseQueryResult} from "@tanstack/react-query";
import {PermissionResponse} from "../../../contexts/auth/types.ts";

export type UsePermissionsProps<
    TData = PermissionResponse,
    TParams extends Record<string, any> = Record<string, any>,
> = {
    v3LegacyAuthProviderCompatible?: false;
    options?: UseQueryOptions<TData>;
    params?: TParams;
};

export type UsePermissionsReturnType<TData = PermissionResponse> =
    UseQueryResult<TData, unknown>;

export function usePermissions<
    TData = any,
    TParams extends Record<string, any> = Record<string, any>,
>({
      v3LegacyAuthProviderCompatible = false,
      options,
      params,
  }: UsePermissionsProps<TData, TParams> = {}): UsePermissionsReturnType {
    const {getPermissions} = useAuthBindingsContext();
    const {keys, preferLegacyKeys} = useKeys();
    const queryResponse = useQuery<TData>({
        queryKey: keys().auth().action("permissions").get(preferLegacyKeys),
        // Enabled check for `getPermissions` is enough to be sure that it's defined in the query function but TS is not smart enough to know that.
        queryFn: (getPermissions
            ? () => getPermissions(params)
            : () => Promise.resolve(undefined)) as (
            params?: unknown,
        ) => Promise<TData>,
        enabled: !v3LegacyAuthProviderCompatible && !!getPermissions,
        ...(v3LegacyAuthProviderCompatible ? {} : options),
        meta: {},
    });
    return queryResponse
}
