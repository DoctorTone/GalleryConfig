import { Canvas } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";
import Art from "./components/Art";
import { SCENE, TRANSFORM_NODES } from "./state/Config";
import DragDrop from "./components/DragDrop";
import Controls from "./UI/Controls";
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
          console.log("Clicked canvas");
          event.stopPropagation();
          if (selectedObject === null) {
            setCheckState(true);
          }
        }}
        onContextMenu={(event) => {
          console.log("Right clicked");
          if (selectedObject !== null) {
            setTransformMode((currentMode + 1) % 3);
          }
        }}
        onPointerMissed={(event) => {
          {
            event.type === "click" && setSelectedObject(null);
          }
        }}
      >
        <Art />
        <OrbitControls makeDefault />
        <ObjectSelection />
        {selectedObject !== null && (
          <TransformControls
            object={selectedObject}
            mode={TRANSFORM_NODES[currentMode]}
          />
        )}
      </Canvas>
      <DragDrop />
      <Controls />
    </>
  );
}

export default App;
