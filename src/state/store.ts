import { create } from "zustand";

interface FileState {
  file: File | null;
  setFile: (file: File | null) => void;
}

const useStore = create<FileState>((set) => ({
  file: null,
  setFile: (objFile) => set(() => ({ file: objFile })),
}));

export default useStore;
