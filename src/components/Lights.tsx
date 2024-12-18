import { useEffect } from "react";
import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  SpotLight,
  SpotLightHelper,
} from "three";
import { useThree } from "@react-three/fiber";
import useStore from "../state/store";
import { SCENE, LIGHTS } from "../state/Config";

const Lights = () => {
  const intensity = useStore((state) => state.intensity);
  const spotLightRequired = useStore((state) => state.spotLightRequired);
  const spotlightHelperRequired = useStore(
    (state) => state.spotlightHelperRequired
  );
  const createSpotLight = useStore((state) => state.createSpotLight);
  const numSpotLights = useStore((state) => state.numSpotLights);
  const addLightState = useStore((state) => state.addLightState);
  const addModelState = useStore((state) => state.addModelState);
  const getSelectedLight = useStore((state) => state.getSelectedLight);
  const getSelectedLightState = useStore(
    (state) => state.getSelectedLightState
  );
  const { scene } = useThree();

  useEffect(() => {
    if (spotLightRequired) {
      const spotLight = new SpotLight();
      spotLight.position.copy(SCENE.SPOTLIGHT_POS);
      spotLight.name = `Spotlight_${numSpotLights}`;
      scene.add(spotLight);
      // Helper
      const spotLightHelper = new SpotLightHelper(spotLight);
      spotLightHelper.visible = LIGHTS.SHOW_HELPER;
      scene.add(spotLightHelper);
      // Target
      const boxGeom = new BoxGeometry(
        SCENE.SPOTLIGHT_SIZE,
        SCENE.SPOTLIGHT_SIZE,
        SCENE.SPOTLIGHT_SIZE
      );
      const targetMat = new MeshStandardMaterial({ color: "blue" });
      const target = new Mesh(boxGeom, targetMat);
      target.name = `Spotlight_Target_${numSpotLights}`;
      scene.add(target);
      addModelState(target.uuid);
      spotLight.target = target;
      // Representation
      const boxMat = new MeshStandardMaterial({ color: "red" });
      const box = new Mesh(boxGeom, boxMat);
      box.position.copy(SCENE.SPOTLIGHT_POS);
      box.name = `Spotlight_Box_${numSpotLights}`;
      scene.add(box);
      addModelState(box.uuid);
      // DEBUG
      console.log("Created ", box.name);
      createSpotLight(false);
      addLightState(spotLight.uuid, spotLightHelper.uuid);
    }
  }, [spotLightRequired]);

  useEffect(() => {
    const light = getSelectedLight();
    if (!light) return;

    const lightState = getSelectedLightState(light.uuid);
    const helperID = lightState?.helperID;
    if (!helperID) return;

    const spotHelper = scene.getObjectByProperty("uuid", helperID);
    if (spotHelper) {
      spotHelper.visible = lightState.helperVisible;
    }
  }, [spotlightHelperRequired]);

  return (
    <>
      <ambientLight intensity={intensity} />
    </>
  );
};

export default Lights;
