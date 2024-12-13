import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import useStore from "../state/store";
import { saveAs } from "file-saver";

const SceneExport = () => {
  const exportRequired = useStore((state) => state.exportRequired);
  const setExport = useStore((state) => state.setExport);
  const { scene } = useThree();

  useEffect(() => {
    if (!exportRequired) return;

    const jsonScene = scene.toJSON();
    console.log("Scene = ", jsonScene);

    const jsonResponse = JSON.stringify(jsonScene);
    const blob = new Blob([jsonResponse], {
      type: "application/json",
    });
    saveAs(blob, "scene.json");
    setExport(false);
  }, [exportRequired]);

  return null;
};

export default SceneExport;
