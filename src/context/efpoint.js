import create from "zustand";
import { devtools } from "zustand/middleware";

let store = (set, get) => ({
  isOpen: {
    BMT: false,
    BRI: false,
    BPRS: false,
    ATM: false,
    Bank: false,
    Sekolah: false,
    Pesantren: false,
    Alfamart: false,
    Indomaret: false,
    RumahSakit: false,
    Puskesmas: false,
    Pasar: false,
  },
  togleIsOpen: (efname) =>
    set({ isOpen: { ...get().isOpen, [efname]: !get().isOpen[efname] } }),
  setAllClose: () =>
    set({
      isOpen: {
        BMT: false,
        BRI: false,
        BPRS: false,
        ATM: false,
        Bank: false,
        Sekolah: false,
        Pesantren: false,
        Alfamart: false,
        Indomaret: false,
        RumahSakit: false,
        Puskesmas: false,
        Pasar: false,
      },
    }),
});

store = devtools(store);
const efPointStore = create(store);

export default efPointStore;
