import { Object3D } from "three";
import { create } from "zustand";

interface FileState {
  file: File | null;
  setFile: (file: File | null) => void;
  intensity: number;
  setIntensity: (value: number) => void;
  dropVisible: boolean;
  setDragDrop: (status: boolean) => void;
  checkState: boolean;
  setCheckState: (status: boolean) => void;
  selectedObject: Object3D | null;
  setSelectedObject: (object: Object3D | null) => void;
  getSelectedObject: () => Object3D | null;
  currentMode: number;
  setTransformMode: (mode: number) => void;
  spotLightRequired: boolean;
  createSpotLight: (status: boolean) => void;
}

const useStore = create<FileState>((set, get) => ({
  file: null,
  setFile: (objFile) => set(() => ({ file: objFile })),
  intensity: 0.5,
  setIntensity: (value) => set(() => ({ intensity: value })),
  dropVisible: true,
  setDragDrop: (status) => set(() => ({ dropVisible: status })),
  checkState: false,
  setCheckState: (status) => set(() => ({ checkState: status })),
  selectedObject: null,
  setSelectedObject: (object) => set(() => ({ selectedObject: object })),
  getSelectedObject: () => get().selectedObject,
  currentMode: 0,
  setTransformMode: (mode) => set(() => ({ currentMode: mode })),
  spotLightRequired: false,
  createSpotLight: (status) => set(() => ({ spotLightRequired: status })),
}));

export default useStore;
