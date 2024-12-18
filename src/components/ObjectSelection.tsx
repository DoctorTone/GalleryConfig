import { useThree } from "@react-three/fiber";
import { TransformControls } from "@react-three/drei";
import { useEffect } from "react";
import { TRANSFORM_NODES } from "../state/Config";
import useStore from "../state/store";
import { LineSegments } from "three";

const ObjectSelection = () => {
  const setCheckState = useStore((state) => state.setCheckState);
  const setSelectedModel = useStore((state) => state.setSelectedModel);
  const getSelectedModelState = useStore(
    (state) => state.getSelectedModelState
  );
  const setSelectedLight = useStore((state) => state.setSelectedLight);
  const selectedModel = useStore((state) => state.selectedModel);
  const selectedLight = useStore((state) => state.selectedLight);
  const checkState = useStore((state) => state.checkState);
  const { raycaster, scene } = useThree();
  const currentMode = useStore((state) => state.currentMode);

  const update = () => {
    if (currentMode === 0) {
      if (selectedLight) {
        if (selectedModel?.name.includes("Spotlight_Target")) return;

        selectedLight.position.copy(selectedModel!.position);
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
      // Do not pick helpers
      if (currentObject instanceof LineSegments) {
        setCheckState(false);
        return;
      }

      let selected = null;
      while (!found) {
        if (currentObject.parent!.type === "Scene") {
          selected = currentObject;
          found = true;
        } else {
          currentObject = currentObject.parent!;
        }
      }
      // Check that object not locked
      const state = getSelectedModelState(selected!.uuid);
      // DEBUG
      console.log("State = ", state);
      if (!state || state.locked) {
        setCheckState(false);
        return;
      }

      setSelectedModel(selected);
      if (selected!.name.includes("Spotlight")) {
        const spotNumber = selected?.name.slice(-1);
        const spotLight = scene.getObjectByName(`Spotlight_${spotNumber}`);
        if (!spotLight) return;
        setSelectedLight(spotLight);
      }
    }

    setCheckState(false);
  }, [checkState]);

  return (
    <>
      {selectedModel !== null && (
        <TransformControls
          object={selectedModel}
          mode={TRANSFORM_NODES[currentMode]}
          onChange={update}
        />
      )}
    </>
  );
};

export default ObjectSelection;
