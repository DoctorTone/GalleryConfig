import { Suspense, useState, useEffect } from "react";
import useStore from "../state/store";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTF } from "three-stdlib";

const Art = () => {
  const [gltf, setGltf] = useState<GLTF>();
  const file = useStore((state) => state.file);

  useEffect(() => {
    if (file && !gltf) {
      let url = URL.createObjectURL(file);
      const gltfLoader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
      gltfLoader.setDRACOLoader(dracoLoader);

      const loadModel = async () => {
        try {
          const model = await gltfLoader.loadAsync(url);
          //@ts-ignore
          setGltf(model);
        } catch (error) {
          console.log("Error = ", error);
        }
      };

      loadModel();
    }
  }, [file]);

  return (
    <Suspense fallback={null}>
      {gltf && <primitive object={gltf.scene} />}
    </Suspense>
  );
};

export default Art;
