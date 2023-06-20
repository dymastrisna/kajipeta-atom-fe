import create from "zustand";
import { devtools, persist } from "zustand/middleware";

let store = (set, get) => ({
  isDMopen: false,
  togleDM: () => set(() => ({ isDMopen: !get().isDMopen })),
  isEFopen: false,
  togleEF: () => set(() => ({ isEFopen: !get().isEFopen })),
  isGSopen: false,
  togleGS: () => set(() => ({ isGSopen: !get().isGSopen })),
  isRAopen: false,
  togleRA: () => set(() => ({ isRAopen: !get().isRAopen })),
  isSCopen: false,
  togleSC: () => set(() => ({ isSCopen: !get().isSCopen })),
  isMDopen: false,
  togleMD: () => set(() => ({ isMDopen: !get().isMDopen })),
  isDSopen: false,
  togleDS: () => set(() => ({ isDSopen: !get().isDSopen })),
  isSGopen: false,
  togleSG: () => set(() => ({ isSGopen: !get().isSGopen })),
  isDRopen: false, //demography result
  togleDR: () => set(() => ({ isDRopen: !get().isDRopen })),
});

store = devtools(store);
store = persist(store, { name: "disp_state" });
const dispStore = create(store);

export default dispStore;
