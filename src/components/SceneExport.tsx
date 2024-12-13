import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import useStore from "../state/store";

const SceneExport = () => {
  const exportRequired = useStore((state) => state.exportRequired);
  const setExport = useStore((state) => state.setExport);
  const { scene } = useThree();

  useEffect(() => {
    if (!exportRequired) return;

    const jsonScene = scene.toJSON();
    console.log("Scene = ", jsonScene);
    setExport(false);
  }, [exportRequired]);

  return null;
};

export default SceneExport;
