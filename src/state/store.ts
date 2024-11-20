import { create } from "zustand";

interface FileState {
  file: File | null;
  setFile: (file: File | null) => void;
  intensity: number;
  setIntensity: (value: number) => void;
}

const useStore = create<FileState>((set) => ({
  file: null,
  setFile: (objFile) => set(() => ({ file: objFile })),
  intensity: 0.5,
  setIntensity: (value) => set(() => ({ intensity: value })),
}));

export default useStore;
