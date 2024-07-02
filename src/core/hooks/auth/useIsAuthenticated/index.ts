import {type UseQueryResult, useQuery} from "@tanstack/react-query";
import {CheckResponse} from "../../../contexts/auth/types.ts";
import {useAuthBindingsContext} from "../../../contexts/auth";
import {useKeys} from "../../useKeys";

export type UseIsAuthenticatedProps = {
    v3LegacyAuthProviderCompatible?: false;
    params?: any;
};

export type UseIsAuthenticatedReturnType = UseQueryResult<CheckResponse, any>;

export function useIsAuthenticated({
                                       v3LegacyAuthProviderCompatible = false,
                                       params,
                                   }: UseIsAuthenticatedProps = {}): UseIsAuthenticatedReturnType {
    const {check} = useAuthBindingsContext()
    const {keys, preferLegacyKeys} = useKeys()
    const queryResponse = useQuery({
        queryKey: keys()
            .auth()
            .action("check")
            .params(params)
            .get(preferLegacyKeys),
        queryFn: async () => (await check?.(params)) ?? {},
        retry: false,
        enabled: !v3LegacyAuthProviderCompatible,
        meta: {}
    })

    return queryResponse
}
