import { LIGHTS } from "../state/Config";

export class LightState {
  color: number;
  intensity: number;
  distance: number;
  angle: number;
  penumbra: number;
  decay: number;
  uuid: string;

  constructor(id: string) {
    this.color = LIGHTS.COLOR;
    this.intensity = LIGHTS.INTENSITY;
    this.distance = LIGHTS.DISTANCE;
    this.angle = LIGHTS.ANGLE;
    this.penumbra = LIGHTS.PENUMBRA;
    this.decay = LIGHTS.DECAY;
    this.uuid = id;
  }
}
