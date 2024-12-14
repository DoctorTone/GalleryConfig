import { Light, Mesh, Object3D } from "three";

export const toggleLights = (object: Object3D, status: boolean) => {
  object.traverse((child) => {
    if (child instanceof Light) {
      child.visible = status;
    }
  });
};

export const toggleWireframe = (object: Object3D, status: boolean) => {
  object.traverse((child) => {
    if (child instanceof Mesh) {
      child.material.wireframe = status;
    }
  });
};
