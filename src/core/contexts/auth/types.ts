import {RefineError} from "../data/types.ts";

export type AuthProvider = {
  login: (params: any) => Promise<AuthActionResponse>;
  logout: (params: any) => Promise<AuthActionResponse>;
  check: (params?: any) => Promise<CheckResponse>;
  onError: (error: any) => Promise<OnErrorResponse>;
  register?: (params: any) => Promise<AuthActionResponse>;
  forgotPassword?: (params: any) => Promise<AuthActionResponse>;
  updatePassword?: (params: any) => Promise<AuthActionResponse>;
  getPermissions?: (
    params?: Record<string, any>,
  ) => Promise<PermissionResponse>;
  getIdentity?: (params?: any) => Promise<IdentityResponse>;
};

export type AuthActionResponse = {
  success: boolean;
  redirectTo?: string;
  error?: RefineError | Error;
  [key: string]: unknown;
  successNotification?: SuccessNotificationResponse;
};

export type SuccessNotificationResponse = {
  message: string;
  description?: string;
};

export type CheckResponse = {
  authenticated: boolean;
  redirectTo?: string;
  logout?: boolean;
  error?: RefineError | Error;
};

export type OnErrorResponse = {
  redirectTo?: string;
  logout?: boolean;
  error?: RefineError | Error;
};

export type PermissionResponse = unknown;

export type IdentityResponse = unknown;

// 将 AuthProvider 的所有属性设置为可选的类型。此实用程序将返回一个表示给定类型的所有子集的类型
export interface IAuthContext extends Partial<AuthProvider> {
  isProvided: boolean;
}