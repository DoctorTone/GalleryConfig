import { LIGHTS } from "../state/Config";

export class LightState {
  color: number;
  intensity: number;
  distance: number;
  angle: number;
  penumbra: number;
  decay: number;
  uuid: string;
  helperID: string;
  helperVisible: boolean;

  constructor(id: string, helperID: string) {
    this.color = LIGHTS.COLOR;
    this.intensity = LIGHTS.INTENSITY;
    this.distance = LIGHTS.DISTANCE;
    this.angle = LIGHTS.ANGLE;
    this.penumbra = LIGHTS.PENUMBRA;
    this.decay = LIGHTS.DECAY;
    this.uuid = id;
    this.helperID = helperID;
    this.helperVisible = false;
  }
}
