import {useQuery, UseQueryOptions, UseQueryResult} from "@tanstack/react-query";
import {useAuthBindingsContext} from "../../../contexts/auth";
import {useKeys} from "../../useKeys";
import {IdentityResponse} from "../../../contexts/auth/types.ts";

export type UseGetIdentityProps<TData = IdentityResponse> = {
    v3LegacyAuthProviderCompatible?: boolean;
    queryOptions?: UseQueryOptions<TData>;
};

export type UseGetIdentityReturnType<TData = IdentityResponse> = UseQueryResult<
    TData,
    unknown
>;

export function useGetIdentity<TData = any>({
                                                v3LegacyAuthProviderCompatible = false,
                                                queryOptions,
                                            }: UseGetIdentityProps = {}): UseGetIdentityReturnType {
    const {getIdentity} = useAuthBindingsContext();
    const {keys, preferLegacyKeys} = useKeys();
    const queryResponse = useQuery({
        queryKey: keys().auth().action("identity").get(preferLegacyKeys),
        queryFn:
            (getIdentity as (params?: unknown) => Promise<TData>) ??
            (() => Promise.resolve({})),
        enabled: !v3LegacyAuthProviderCompatible && !!getIdentity,
        retry: false,
        ...(v3LegacyAuthProviderCompatible === true ? {} : queryOptions),
        meta: {},
    })
    return queryResponse
}
