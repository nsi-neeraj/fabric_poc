export type UserRoleType = "user" | "admin";

export interface UserType {
  role: UserRoleType;
  uid: string;
  name: string;
}

export interface AuthType {
  isAuthenticated: boolean;
  user?: UserType;
}

export interface AuthState {
  auth: AuthType;
  login: (user: UserType) => void;
  logout: () => void;
}


export const DEFAULT_AUTH_STATE: AuthType = {
  isAuthenticated: false,
  user: undefined,
};