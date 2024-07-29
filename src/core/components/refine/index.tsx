import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthBindingsContextProvider} from "../../contexts/auth";
import {RefineProps} from "./types.ts";
import {DataContextProvider} from "../../contexts/data";

// Create a client
const queryClient = new QueryClient()
export const Refine: React.FC<RefineProps> = ({authProvider, dataProvider, children}) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthBindingsContextProvider {...(authProvider ?? {})} isProvided={Boolean(authProvider)}>
                <DataContextProvider dataProvider={dataProvider}>
                    {children}
                </DataContextProvider>
            </AuthBindingsContextProvider>
        </QueryClientProvider>
    );
};
