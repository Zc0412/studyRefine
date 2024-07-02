import React from 'react';
import {useIsAuthenticated} from "./core/hooks";

const Test = () => {
    const isAuthenticated= useIsAuthenticated()
    console.log(isAuthenticated)
    return (
        <div>

        </div>
    );
};

export default Test;
