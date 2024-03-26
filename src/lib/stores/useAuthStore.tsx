import { create } from "zustand";

export interface UseAuthStoreProps {
  token: string;
  setToken: (token: string) => void;
  loadFromGetToken: () => void;
}

const useAuthStore = create<UseAuthStoreProps>((set, getState) => ({
  token: "",
  setToken: (token: string) => set({ token }),

  loadFromGetToken: () => {
    const token = localStorage.getItem("@auth/access_token");

    if (token !== null && token !== "") {
      set({ token: token });
    }
  },
}));

export default useAuthStore;
