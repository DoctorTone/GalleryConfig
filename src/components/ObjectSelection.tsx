import { useThree } from "@react-three/fiber";
import { TransformControls } from "@react-three/drei";
import { useEffect } from "react";
import { TRANSFORM_NODES } from "../state/Config";
import useStore from "../state/store";

const ObjectSelection = () => {
  const setCheckState = useStore((state) => state.setCheckState);
  const setSelectedObject = useStore((state) => state.setSelectedObject);
  const selectedObject = useStore((state) => state.selectedObject);
  const checkState = useStore((state) => state.checkState);
  const { raycaster, scene } = useThree();
  const currentMode = useStore((state) => state.currentMode);

  const update = (event) => {
    if (currentMode === 0) {
      console.log("Dragging");
      if (selectedObject?.name.includes("Spotlight")) {
        console.log("Dragging spotlight");
        const spotNumber = selectedObject.name.slice(-1);
        console.log("Spot number = ", spotNumber);
        const spotlight = scene.getObjectByName(`Spotlight_${spotNumber}`);
        spotlight?.position.copy(selectedObject.position);
      }
    }
  };

  useEffect(() => {
    if (!checkState) return;

    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length) {
      // DEBUG
      console.log("Selected = ", intersects[0].object);
      let found = false;
      let currentObject = intersects[0].object;
      let selected = null;
      while (!found) {
        if (currentObject.parent!.isScene) {
          selected = currentObject;
          found = true;
        } else {
          currentObject = currentObject.parent;
        }
      }
      setSelectedObject(selected);
    }

    setCheckState(false);
  }, [checkState]);

  return (
    <>
      {selectedObject !== null && (
        <TransformControls
          object={selectedObject}
          mode={TRANSFORM_NODES[currentMode]}
          onChange={update}
        />
      )}
    </>
  );
};

export default ObjectSelection;
