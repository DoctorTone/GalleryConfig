export class ModelState {
  useInternal: boolean;
  wireframe: boolean;
  locked: boolean;
  uuid: string;

  constructor(id: string) {
    this.useInternal = true;
    this.wireframe = true;
    this.locked = false;
    this.uuid = id;
  }
}
