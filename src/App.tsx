import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Art from "./components/Art";
import { SCENE } from "./state/Config";
import DragDrop from "./components/DragDrop";
import Controls from "./UI/Controls";
import useStore from "./state/store";
import ObjectSelection from "./components/ObjectSelection";
import { useState } from "react";

function App() {
  const setCheckState = useStore((state) => state.setCheckState);

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
      </Canvas>
      <DragDrop />
      <Controls />
    </>
  );
}

export default App;
