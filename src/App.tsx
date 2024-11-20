import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Box } from "@react-three/drei";
import { SCENE } from "./state/Config";

function App() {
  return (
    <>
      <Canvas camera={{ position: SCENE.cameraPosition }}>
        <Box />
        <OrbitControls makeDefault enablePan={false} enableRotate={true} />
      </Canvas>
    </>
  );
}

export default App;
