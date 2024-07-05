import React from 'react';
import {useAuthBindingsContext} from "../../contexts/auth";
import {useParsed} from "../../hooks/router/useParsed";

export type AuthenticatedCommonProps = {
    /**
     * Unique key to identify the component.
     * This is required if you have multiple `Authenticated` components at the same level.
     * @required
     */
    key: React.Key;
    /**
     * Whether to redirect user if not logged in or not.
     * If not set, user will be redirected to `redirectTo` property of the `check` function's response.
     * This behavior is only available for new auth providers.
     * Legacy auth providers will redirect to `/login` by default if this property is not set.
     * If set to a string, user will be redirected to that string.
     *
     * This property only works if `fallback` is **not set**.
     */
    redirectOnFail?: string | true;
    /**
     * Whether to append current path to search params of the redirect url at `to` property.
     *
     * By default, `to` parameter is used by successful invocations of the `useLogin` hook.
     * If `to` present, it will be used as the redirect url after successful login.
     */
    appendCurrentPathToQuery?: boolean;
    /**
     * Content to show if user is not logged in.
     */
    fallback?: React.ReactNode;
    /**
     * Content to show while checking whether user is logged in or not.
     */
    loading?: React.ReactNode;
    /**
     * Content to show if user is logged in
     */
    children?: React.ReactNode;
};
export type AuthenticatedProps = {
    v3LegacyAuthProviderCompatible?: false;
} & AuthenticatedCommonProps;

export const Authenticated = ({
                                  redirectOnFail = true,
                                  appendCurrentPathToQuery = true,
                                  children,
                                  fallback: fallbackContent,
                                  loading: loadingContent,
                              }: AuthenticatedProps): JSX.Element | null => {
    const  {isProvided}= useAuthBindingsContext()
    const hasAuthProvider = Boolean(isProvided)
    const parsed = useParsed();

    return (
        <div>

        </div>
    );
};

