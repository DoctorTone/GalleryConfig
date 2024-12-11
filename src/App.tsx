import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Art from "./components/Art";
import { SCENE, TRANSFORM_NODES } from "./state/Config";
import DragDrop from "./components/DragDrop";
import Controls from "./UI/Controls";
import Lights from "./components/Lights";
import useStore from "./state/store";
import ObjectSelection from "./components/ObjectSelection";

function App() {
  const setCheckState = useStore((state) => state.setCheckState);
  const selectedObject = useStore((state) => state.selectedObject);
  const setSelectedObject = useStore((state) => state.setSelectedObject);
  const currentMode = useStore((state) => state.currentMode);
  const setTransformMode = useStore((state) => state.setTransformMode);

  return (
    <>
      <Canvas
        camera={{ position: SCENE.cameraPosition, fov: 60 }}
        onClick={(event) => {
          event.stopPropagation();
          if (selectedObject === null) {
            setCheckState(true);
          }
        }}
        onContextMenu={(event) => {
          if (selectedObject !== null) {
            setTransformMode((currentMode + 1) % TRANSFORM_NODES.length);
          }
        }}
        onPointerMissed={(event) => {
          {
            event.type === "click" && setSelectedObject(null);
          }
        }}
      >
        <Lights />
        <Art />
        <OrbitControls makeDefault />
        <ObjectSelection />
      </Canvas>
      <DragDrop />
      <Controls />
    </>
  );
}

export default App;
