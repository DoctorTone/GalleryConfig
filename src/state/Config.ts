import { Vector3 } from "three";

const SCENE = {
  cameraPosition: new Vector3(0, 2, 1.5),
  targetPos: new Vector3(0, 2, -1.5),
  ambientIntensity: 0.5,
  UP: new Vector3(0, 1, 0),
  LOW_RES: 1024,
  MIN_DISTANCE: 0.4,
  MAX_DISTANCE: 2,
  SPOTLIGHT_POS: new Vector3(0, 2, 0),
};

const TRANSFORM_NODES = ["translate", "rotate", "scale"];

export { SCENE, TRANSFORM_NODES };
