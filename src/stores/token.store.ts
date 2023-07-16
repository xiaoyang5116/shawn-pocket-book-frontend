import { create } from "zustand";
import { persist } from "zustand/middleware";

type Token = {
  accessToken: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const useTokenStore = create<Token>()(
  persist(
    (set) => ({
      accessToken: null,
      setToken: (token: string) => {
        set({ accessToken: token });
      },
      clearToken: () => {
        localStorage.removeItem("accessToken");
        set({ accessToken: null });
      },
    }),
    { name: "token-store" }
  )
);

export const useToken = () => useTokenStore((state) => state.accessToken);
export const useSetToken = () => useTokenStore((state) => state.setToken);
export const useClearToken = () => useTokenStore((state) => state.clearToken);
