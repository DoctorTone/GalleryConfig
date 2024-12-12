export class LightState {
  color: number;
  intensity: number;
  distance: number;
  angle: number;
  penumbra: number;
  decay: number;
  uuid: string;

  constructor(id: string) {
    this.color = 0xffffff;
    this.intensity = 1;
    this.distance = 0;
    this.angle = Math.PI / 2;
    this.penumbra = 0;
    this.decay = 2;
    this.uuid = id;
  }
}
