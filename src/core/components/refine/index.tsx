import React from "react";
import {AuthBindingsContextProvider} from "../../contexts/auth";
import {RefineProps} from "./types.ts";


export const Refine: React.FC<RefineProps> = ({authProvider, children}) => {
  return (
    <AuthBindingsContextProvider {...(authProvider ?? {})} isProvided={Boolean(authProvider)}>
      {children}
    </AuthBindingsContextProvider>
  );
};