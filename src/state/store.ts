import { Object3D } from "three";
import { create } from "zustand";
import { SCENE } from "./Config";
import { ModelState } from "./ModelState";
import { LightState } from "./LightState";

interface FileState {
  file: File | null;
  setFile: (file: File | null) => void;
  intensity: number;
  setIntensity: (value: number) => void;
  dropVisible: boolean;
  setDragDrop: (status: boolean) => void;
  checkState: boolean;
  setCheckState: (status: boolean) => void;
  selectedModel: Object3D | null;
  setSelectedModel: (object: Object3D | null) => void;
  getSelectedModel: () => Object3D | null;
  selectedLight: Object3D | null;
  setSelectedLight: (object: Object3D | null) => void;
  getSelectedLight: () => Object3D | null;
  currentMode: number;
  setTransformMode: (mode: number) => void;
  spotLightRequired: boolean;
  createSpotLight: (status: boolean) => void;
  numSpotLights: number;
  modelStates: ModelState[];
  addModelState: (uuid: string) => void;
  getSelectedModelState: (id: string) => ModelState | undefined;
  lightStates: LightState[];
  addLightState: (uuid: string) => void;
  getSelectedLightState: (id: string) => LightState | undefined;
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
  selectedModel: null,
  setSelectedModel: (object) => set(() => ({ selectedModel: object })),
  getSelectedModel: () => get().selectedModel,
  selectedLight: null,
  setSelectedLight: (object) => set(() => ({ selectedLight: object })),
  getSelectedLight: () => get().selectedLight,
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
  getSelectedModelState: (id) =>
    get().modelStates.find((element) => element.uuid === id),
  lightStates: [],
  addLightState: (uuid) =>
    set((state) => ({
      lightStates: [...state.lightStates, new LightState(uuid)],
    })),
  getSelectedLightState: (id) =>
    get().lightStates.find((element) => element.uuid === id),
}));

export default useStore;
