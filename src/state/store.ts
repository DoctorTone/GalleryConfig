import { Object3D } from "three";
import { create } from "zustand";
import { SCENE } from "./Config";
import { ModelState } from "./ModelState";

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
  numSpotLights: number;
  modelStates: ModelState[];
  addModelState: (uuid: string) => void;
  getSelectedObjectState: (id: string) => ModelState | undefined;
}

const useStore = create<FileState>((set, get) => ({
  file: null,
  setFile: (objFile) => set(() => ({ file: objFile })),
  intensity: SCENE.ambientIntensity,
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
  createSpotLight: (status) =>
    set((state) => ({
      spotLightRequired: status,
      numSpotLights: status ? state.numSpotLights + 1 : state.numSpotLights,
    })),
  numSpotLights: 0,
  modelStates: [],
  addModelState: (uuid) =>
    set((state) => ({
      modelStates: [...state.modelStates, new ModelState(uuid)],
    })),
  getSelectedObjectState: (id) =>
    get().modelStates.find((element) => element.uuid === id),
}));

export default useStore;
