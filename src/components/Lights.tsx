import { useEffect } from "react";
import { SpotLight } from "three";
import { useThree } from "@react-three/fiber";
import useStore from "../state/store";
import { SCENE } from "../state/Config";

const Lights = () => {
  const intensity = useStore((state) => state.intensity);
  const spotLightRequired = useStore((state) => state.spotLightRequired);
  const createSpotLight = useStore((state) => state.createSpotLight);
  const { scene } = useThree();

  useEffect(() => {
    if (spotLightRequired) {
      const spotLight = new SpotLight();
      spotLight.position.copy(SCENE.SPOTLIGHT_POS);
      scene.add(spotLight);
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
