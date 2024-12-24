import { Object3D } from "three";
import { create } from "zustand";
import { LIGHTS, SCENE } from "./Config";
import { ModelState } from "./ModelState";
import { LightState } from "./LightState";

interface FileState {
  file: File | null;
  setFile: (file: File | null) => void;
  exportRequired: boolean;
  setExport: (status: boolean) => void;
  sceneFile: string;
  setSceneFile: (filename: string) => void;
  intensity: number;
  setIntensity: (value: number) => void;
  dropVisible: boolean;
  toggleDragDrop: () => void;
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
  spotlightHelperUpdateRequired: boolean;
  updateSpotlightHelper: (status: boolean) => void;
  modelStates: ModelState[];
  addModelState: (uuid: string) => void;
  getSelectedModelState: (id: string) => ModelState | undefined;
  lightStates: LightState[];
  addLightState: (uuid: string, helperID: string) => void;
  getSelectedLightState: (id: string) => LightState | undefined;
  spotlightHelperRequired: boolean;
  toggleSpotlightHelper: () => void;
  unlockAll: () => void;
}

const useStore = create<FileState>((set, get) => ({
  file: null,
  setFile: (objFile) => set(() => ({ file: objFile })),
  exportRequired: false,
  setExport: (status) => set(() => ({ exportRequired: status })),
  sceneFile: "",
  setSceneFile: (filename) => set(() => ({ sceneFile: filename })),
  intensity: SCENE.ambientIntensity,
  setIntensity: (value) => set(() => ({ intensity: value })),
  dropVisible: true,
  toggleDragDrop: () => set((state) => ({ dropVisible: !state.dropVisible })),
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
  spotlightHelperUpdateRequired: false,
  updateSpotlightHelper: (status) =>
    set(() => ({ spotlightHelperUpdateRequired: status })),
  modelStates: [],
  addModelState: (uuid) =>
    set((state) => ({
      modelStates: [...state.modelStates, new ModelState(uuid)],
    })),
  getSelectedModelState: (id) =>
    get().modelStates.find((element) => element.uuid === id),
  lightStates: [],
  addLightState: (uuid, helperID) =>
    set((state) => ({
      lightStates: [...state.lightStates, new LightState(uuid, helperID)],
    })),
  getSelectedLightState: (id) =>
    get().lightStates.find((element) => element.uuid === id),
  spotlightHelperRequired: LIGHTS.SHOW_HELPER,
  toggleSpotlightHelper: () =>
    set((state) => ({
      spotlightHelperRequired: !state.spotlightHelperRequired,
    })),
  unlockAll: () =>
    set((state) => ({
      modelStates: state.modelStates.map((element) => ({
        ...element,
        locked: false,
      })),
    })),
}));

export default useStore;
