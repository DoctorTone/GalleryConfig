import { Canvas } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";
import Art from "./components/Art";
import { SCENE } from "./state/Config";
import DragDrop from "./components/DragDrop";
import Controls from "./UI/Controls";
import useStore from "./state/store";
import ObjectSelection from "./components/ObjectSelection";

function App() {
  const setCheckState = useStore((state) => state.setCheckState);
  const selectedObject = useStore((state) => state.selectedObject);

  return (
    <>
      <Canvas
        camera={{ position: SCENE.cameraPosition, fov: 60 }}
        onClick={(event) => {
          event.stopPropagation();
          setCheckState(true);
        }}
      >
        <Art />
        <OrbitControls makeDefault />
        <ObjectSelection />
        {selectedObject !== null && (
          <TransformControls object={selectedObject} />
        )}
      </Canvas>
      <DragDrop />
      <Controls />
    </>
  );
}

export default App;
