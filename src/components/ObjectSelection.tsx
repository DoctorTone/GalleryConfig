import { useThree } from "@react-three/fiber";
import { TransformControls } from "@react-three/drei";
import { useEffect } from "react";
import { TRANSFORM_NODES } from "../state/Config";
import useStore from "../state/store";
import { getSelectedMesh } from "../utils/Utils";
import { Object3D, SpotLightHelper } from "three";

const ObjectSelection = () => {
  const setCheckState = useStore((state) => state.setCheckState);
  const setSelectedModel = useStore((state) => state.setSelectedModel);
  const getSelectedModelState = useStore(
    (state) => state.getSelectedModelState
  );
  const getSelectedLightState = useStore(
    (state) => state.getSelectedLightState
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
        // Update helper
        const helperID = getSelectedLightState(selectedLight.uuid)?.helperID;
        if (!helperID) return;

        const spotHelper = scene.getObjectByProperty(
          "uuid",
          helperID
        ) as SpotLightHelper;
        if (spotHelper) {
          spotHelper.update();
        }
      }
    }
  };

  useEffect(() => {
    if (!checkState) return;

    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length) {
      // DEBUG
      console.log("Selected = ", intersects);
      let currentObject = getSelectedMesh(intersects);
      // Do not pick helpers
      if (!currentObject) {
        setCheckState(false);
        return;
      }

      let found = false;
      let selected: Object3D | null = null;
      while (!found) {
        if (currentObject!.parent!.type === "Scene") {
          selected = currentObject as Object3D;
          found = true;
        } else {
          currentObject = currentObject!.parent!;
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
