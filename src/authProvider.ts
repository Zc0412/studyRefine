import {AuthProvider} from "./core/contexts/auth/types.ts";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {
    login: async ({email, password}) => {
        localStorage.setItem(TOKEN_KEY, `${email}-${password}`);
        return {
            success: true,
            redirectTo: "/",
        };
    },
    register: async ({email, password}) => {
        try {
            await authProvider.login({email, password});
            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                error: {
                    message: "Register failed",
                    name: "Invalid email or password",
                },
            };
        }
    },
    updatePassword: async (params) => {
        return {
            success: true,
        };
    },
    forgotPassword: async () => {
        return {
            success: true,
        };
    },
    logout: async () => {
        localStorage.removeItem(TOKEN_KEY);
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        if (error.response?.status === 401) {
            return {
                logout: true,
            };
        }

        return {error};
    },
    check: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            error: {
                message: "Check failed",
                name: "Token not found",
            },
            logout: true,
            redirectTo: "/login",
        };
    },
    getPermissions: async (params) => {
        if (params) {
            // do some logic like for example you can get roles for specific tenant
            return ["admin"];
        }

        return ["admin"];
    },
    getIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return null;
        }

        return {
            id: 1,
            name: "James Sullivan",
            avatar: "https://i.pravatar.cc/150",
        };
    },
};
