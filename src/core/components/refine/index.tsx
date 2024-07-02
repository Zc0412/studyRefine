import React from "react";
import {AuthBindingsContextProvider} from "../../contexts/auth";
import {RefineProps} from "./types.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient()
export const Refine: React.FC<RefineProps> = ({authProvider, children}) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthBindingsContextProvider {...(authProvider ?? {})} isProvided={Boolean(authProvider)}>
                {children}
            </AuthBindingsContextProvider>
        </QueryClientProvider>
    );
};
