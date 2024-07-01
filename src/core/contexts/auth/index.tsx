import React, {PropsWithChildren} from 'react';
import {IAuthContext} from "./types.ts";

export const AuthBindingsContextProvider: React.FC<PropsWithChildren<IAuthContext>> = ({
                                                                                         children,
                                                                                         isProvided,
                                                                                         ...authBindings
                                                                                       }) => {
  const handleLogin = async (params: unknown) => {
    try {
      const result = await authBindings.login?.(params);

      return result;
    } catch (error) {
      console.warn(
        "Unhandled Error in login: refine always expects a resolved promise.",
        error,
      );
      return Promise.reject(error);
    }
  };
  return (
    <div>
      {children}
    </div>
  );
};
