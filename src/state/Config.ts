import { Vector3 } from "three";

const SCENE = {
  cameraPosition: new Vector3(0, 2, 1.5),
  targetPos: new Vector3(0, 2, -1.5),
  ambientIntensity: 0.5,
  UP: new Vector3(0, 1, 0),
  LOW_RES: 1024,
  MIN_DISTANCE: 0.4,
  MAX_DISTANCE: 2,
  SPOTLIGHT_POS: new Vector3(0, 3, 0),
  SPOTLIGHT_SIZE: 0.25,
};

const TRANSFORM_NODES: ("translate" | "rotate" | "scale")[] = [
  "translate",
  "rotate",
  "scale",
];

const LIGHTS = {
  COLOR: 0xffffff,
  INTENSITY: 1,
  DISTANCE: 0,
  ANGLE: Math.PI / 3,
  PENUMBRA: 0,
  DECAY: 2,
};

export { SCENE, TRANSFORM_NODES, LIGHTS };
