import create from "zustand";
import { devtools, persist } from "zustand/middleware";

let store = (set) => ({
  user: {},
  setUser: (newUser) =>
    set(() => ({
      user: newUser,
    })),
});

store = devtools(store);
store = persist(store, { name: "current_user" });
const authStore = create(store);

export default authStore;
