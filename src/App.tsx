import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Art from "./components/Art";
import { SCENE } from "./state/Config";
import DragDrop from "./components/DragDrop";

function App() {
  return (
    <>
      <Canvas camera={{ position: SCENE.cameraPosition }}>
        <Art />
        <OrbitControls makeDefault enablePan={false} enableRotate={true} />
      </Canvas>
      <DragDrop />
    </>
  );
}

export default App;
