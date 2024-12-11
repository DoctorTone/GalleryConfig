import { useEffect } from "react";
import { BoxGeometry, Mesh, MeshStandardMaterial, SpotLight } from "three";
import { useThree } from "@react-three/fiber";
import useStore from "../state/store";
import { SCENE } from "../state/Config";

const Lights = () => {
  const intensity = useStore((state) => state.intensity);
  const spotLightRequired = useStore((state) => state.spotLightRequired);
  const createSpotLight = useStore((state) => state.createSpotLight);
  const numSpotLights = useStore((state) => state.numSpotLights);
  const { scene } = useThree();

  useEffect(() => {
    if (spotLightRequired) {
      const spotLight = new SpotLight();
      spotLight.position.copy(SCENE.SPOTLIGHT_POS);
      spotLight.name = `Spotlight_${numSpotLights}`;
      scene.add(spotLight);
      // Representation
      const boxGeom = new BoxGeometry(
        SCENE.SPOTLIGHT_SIZE,
        SCENE.SPOTLIGHT_SIZE,
        SCENE.SPOTLIGHT_SIZE
      );
      const boxMat = new MeshStandardMaterial({ color: "red" });
      const box = new Mesh(boxGeom, boxMat);
      box.position.copy(SCENE.SPOTLIGHT_POS);
      box.name = `Spotlight_Box_${numSpotLights}`;
      scene.add(box);
      // DEBUG
      console.log("Created ", box.name);
      createSpotLight(false);
    }
  }, [spotLightRequired]);

  return (
    <>
      <ambientLight intensity={intensity} />
    </>
  );
};

export default Lights;
