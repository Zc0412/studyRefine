import React, {createContext, PropsWithChildren} from 'react';
import {IAuthContext} from "./types.ts";

const AuthBindingsContext = createContext<Partial<IAuthContext>>({})

export const AuthBindingsContextProvider: React.FC<PropsWithChildren<IAuthContext>> = ({
                                                                                           children,
                                                                                           isProvided,
                                                                                           ...authBindings
                                                                                       }) => {
    // 登录
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

    // 注册
    const handleRegister = async (params: unknown) => {
        try {
            const result = await authBindings.register?.(params);

            return result;
        } catch (error) {
            console.warn(
                "Unhandled Error in register: refine always expects a resolved promise.",
                error,
            );
            return Promise.reject(error);
        }
    };

    // 退出登录
    const handleLogout = async (params: unknown) => {
        try {
            const result = await authBindings.logout?.(params);

            return result;
        } catch (error) {
            console.warn(
                "Unhandled Error in logout: refine always expects a resolved promise.",
                error,
            );
            return Promise.reject(error);
        }
    };

    // 检查登录
    const handleCheck = async (params: unknown) => {
        try {
            const result = await authBindings.check?.(params);

            return Promise.resolve(result);
        } catch (error) {
            console.warn(
                "Unhandled Error in check: refine always expects a resolved promise.",
                error,
            );
            return Promise.reject(error);
        }
    };

    // 忘记密码
    const handleForgotPassword = async (params: unknown) => {
        try {
            const result = await authBindings.forgotPassword?.(params);

            return Promise.resolve(result);
        } catch (error) {
            console.warn(
                "Unhandled Error in forgotPassword: refine always expects a resolved promise.",
                error,
            );
            return Promise.reject(error);
        }
    };

    // 更新密码
    const handleUpdatePassword = async (params: unknown) => {
        try {
            const result = await authBindings.updatePassword?.(params);
            return Promise.resolve(result);
        } catch (error) {
            console.warn(
                "Unhandled Error in updatePassword: refine always expects a resolved promise.",
                error,
            );
            return Promise.reject(error);
        }
    };
    return (
        <AuthBindingsContext.Provider value={{
            ...authBindings,
            login: handleLogin as IAuthContext['login'],
            logout: handleLogout as IAuthContext["logout"],
            check: handleCheck as IAuthContext["check"],
            register: handleRegister as IAuthContext["register"],
            forgotPassword: handleForgotPassword as IAuthContext["forgotPassword"],
            updatePassword: handleUpdatePassword as IAuthContext["updatePassword"],
            isProvided,//是否传递了authProvider
        }}>
            {children}
        </AuthBindingsContext.Provider>
    );
};
