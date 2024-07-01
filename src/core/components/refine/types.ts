import React from "react";
import {AuthProvider} from "../../contexts/auth/types.ts";

export type RefineProps={
  children?: React.ReactNode;
  authProvider?: AuthProvider;
}

