import { Suspense, useState, useEffect } from "react";
import useStore from "../state/store";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTF } from "three-stdlib";
import { useThree } from "@react-three/fiber";

const Art = () => {
  const [gltf, setGltf] = useState<GLTF>();
  const { scene } = useThree();
  const file = useStore((state) => state.file);
  const setFile = useStore((state) => state.setFile);

  useEffect(() => {
    if (file !== null) {
      let url = URL.createObjectURL(file);
      const gltfLoader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
      gltfLoader.setDRACOLoader(dracoLoader);

      const loadModel = async () => {
        try {
          const model = await gltfLoader.loadAsync(url);
          //@ts-ignore
          scene.add(model.scene);
          setFile(null);
        } catch (error) {
          console.log("Error = ", error);
        }
      };

      loadModel();
    }
  }, [file]);

  return null;
};

export default Art;
