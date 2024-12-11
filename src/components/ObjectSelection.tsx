import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import useStore from "../state/store";
import { Group } from "three";

const ObjectSelection = () => {
  const setCheckState = useStore((state) => state.setCheckState);
  const setSelectedObject = useStore((state) => state.setSelectedObject);
  const checkState = useStore((state) => state.checkState);
  const { raycaster, scene } = useThree();

  useEffect(() => {
    if (!checkState) return;

    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length) {
      // DEBUG
      console.log("Selected = ", intersects[0].object);
      let found = false;
      let startObject = intersects[0].object;
      let selected;
      let currentParent = startObject.parent as Group;
      if (currentParent === null) return;
      while (!found) {
        if (
          currentParent?.isGroup &&
          currentParent?.name === "Scene" &&
          currentParent.parent!.isScene
        ) {
          selected = currentParent;
          found = true;
        } else {
          currentParent = currentParent?.parent;
        }
      }
      setSelectedObject(selected);
    }

    setCheckState(false);
  }, [checkState]);

  return null;
};

export default ObjectSelection;
