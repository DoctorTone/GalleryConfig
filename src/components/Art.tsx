import { useEffect, useMemo } from "react";
import useStore from "../state/store";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { useThree } from "@react-three/fiber";

const Art = () => {
  const { scene } = useThree();
  const file = useStore((state) => state.file);
  const setFile = useStore((state) => state.setFile);
  const addModelState = useStore((state) => state.addModelState);

  const modelLoader = useMemo(() => {
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    gltfLoader.setDRACOLoader(dracoLoader);
    return gltfLoader;
  }, []);

  useEffect(() => {
    if (file !== null) {
      let url = URL.createObjectURL(file);

      const loadModel = async () => {
        try {
          const model = await modelLoader.loadAsync(url);
          //@ts-ignore
          scene.add(model.scene);
          setFile(null);
          addModelState(model.scene.uuid);
        } catch (error) {
          return null;
        }
      };

      loadModel();
    }
  }, [file]);

  return null;
};

export default Art;
