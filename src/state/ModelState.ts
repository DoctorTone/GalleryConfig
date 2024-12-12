export class ModelState {
  useInternal: boolean;
  visible: boolean;
  locked: boolean;
  uuid: string;

  constructor(id: string) {
    this.useInternal = true;
    this.visible = true;
    this.locked = false;
    this.uuid = id;
  }
}
