import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Art from "./components/Art";
import { SCENE, TRANSFORM_NODES } from "./state/Config";
import DragDrop from "./components/DragDrop";
import Controls from "./UI/Controls";
import Lights from "./components/Lights";
import useStore from "./state/store";
import ObjectSelection from "./components/ObjectSelection";
import SceneExport from "./components/SceneExport";

function App() {
  const setCheckState = useStore((state) => state.setCheckState);
  const selectedModel = useStore((state) => state.selectedModel);
  const setSelectedModel = useStore((state) => state.setSelectedModel);
  const selectedLight = useStore((state) => state.selectedLight);
  const setSelectedLight = useStore((state) => state.setSelectedLight);
  const currentMode = useStore((state) => state.currentMode);
  const setTransformMode = useStore((state) => state.setTransformMode);

  return (
    <>
      <Canvas
        camera={{ position: SCENE.cameraPosition, fov: 60 }}
        onClick={(event) => {
          event.stopPropagation();
          if (selectedModel === null && selectedLight === null) {
            setCheckState(true);
          }
        }}
        onContextMenu={() => {
          if (selectedModel !== null || selectedLight !== null) {
            setTransformMode((currentMode + 1) % TRANSFORM_NODES.length);
          }
        }}
        onPointerMissed={(event) => {
          {
            if (event.type === "click") {
              setSelectedModel(null);
              setSelectedLight(null);
            }
          }
        }}
      >
        <Lights />
        <Art />
        <OrbitControls makeDefault />
        <ObjectSelection />
        <SceneExport />
      </Canvas>
      <DragDrop />
      <Controls />
    </>
  );
}

export default App;
