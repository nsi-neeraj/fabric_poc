import { create } from "zustand";
import { Settings } from "../types/store.interface";

const DEFAULT_SETTINGS: Settings = {
  name: "test",
};

const useSettingsStore = create<Settings>((set) => ({
  ...DEFAULT_SETTINGS,
  setName: () => set(() => ({ name: "test" })),
}));

export default useSettingsStore;
