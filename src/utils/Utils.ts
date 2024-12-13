import { Object3D } from "three";

export const toggleLights = (object: Object3D, status: boolean) => {
  object.traverse((obj) => {
    if (obj.isLight) {
      obj.visible = status;
    }
  });
};

export const toggleWireframe = (object: Object3D, status: boolean) => {
  object.traverse((child) => {
    if (child.isMesh) {
      child.material.wireframe = status;
    }
  });
};
