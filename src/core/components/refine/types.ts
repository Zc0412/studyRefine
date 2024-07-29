import React from "react";
import {AuthProvider} from "../../contexts/auth/types.ts";
import {DataProvider, DataProviders} from "../../contexts/data/types.ts";

export type RefineProps = {
    children?: React.ReactNode;
    authProvider?: AuthProvider;
    dataProvider?: DataProvider | DataProviders;
}

