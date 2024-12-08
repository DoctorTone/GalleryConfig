import { create } from "zustand";

interface FileState {
  file: File | null;
  setFile: (file: File | null) => void;
  intensity: number;
  setIntensity: (value: number) => void;
  dropVisible: boolean;
  setDragDrop: (status: boolean) => void;
}

const useStore = create<FileState>((set) => ({
  file: null,
  setFile: (objFile) => set(() => ({ file: objFile })),
  intensity: 0.5,
  setIntensity: (value) => set(() => ({ intensity: value })),
  dropVisible: true,
  setDragDrop: (status) => set(() => ({ dropVisible: status })),
}));

export default useStore;
