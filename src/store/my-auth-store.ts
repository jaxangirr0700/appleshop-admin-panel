import { create } from "zustand";
import { api } from "../utils/api";

type User = {
  email: string;
  id: number;
  name: string;
  role: string;
};

export type MyAuthStateType = {
  token: string;
  user: User | null;
  logout: () => void;
  setAuth: (data: { token: string; user: User }) => void;
};

// 👇 Faqat browserda localStorage o'qiladi
const getInitialAuth = () => {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to parse auth from localStorage:", error);
    return null;
  }
};

const useAuthStore = create<MyAuthStateType>((set) => {
  const ls = getInitialAuth();

  if (ls?.accessToken) {
    api.defaults.headers.Authorization = `Bearer ${ls.accessToken}`;
  }

  return {
    token: ls?.accessToken || "",
    user: ls?.user || null,

    logout: () => {
      localStorage.removeItem("auth");
      set({ token: "", user: null });
      delete api.defaults.headers.Authorization;
    },

    setAuth: ({ token, user }) => {
      localStorage.setItem(
        "auth",
        JSON.stringify({ accessToken: token, user })
      );
      api.defaults.headers.Authorization = `Bearer ${token}`;
      set({ token, user });
    },
  };
});

export default useAuthStore;
