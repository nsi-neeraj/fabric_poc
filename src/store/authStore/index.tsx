import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, DEFAULT_AUTH_STATE } from "./authStore.types";

const useAuthStore = create<AuthState>(
  persist<AuthState>(
    (set) => ({
      auth: DEFAULT_AUTH_STATE,
      login: (user) => set(() => ({ auth: { isAuthenticated: true, user } })),
      logout: () =>
        set(() => ({
          auth: DEFAULT_AUTH_STATE,
        })),
    }),
    {
      name: "user",
    }
  ) as any
);

export default useAuthStore;
