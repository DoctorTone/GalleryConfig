import { Light, Mesh, Object3D, Intersection } from "three";

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

export const getSelectedMesh = (
  objects: Intersection<Object3D>[]
): Mesh | undefined => {
  for (let i = 0; i < objects.length; ++i) {
    if (objects[i].object instanceof Mesh) return objects[i].object as Mesh;
  }
};
