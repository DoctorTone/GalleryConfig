import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import useStore from "../state/store";

const ObjectSelection = () => {
  const setCheckState = useStore((state) => state.setCheckState);
  const checkState = useStore((state) => state.checkState);
  const { raycaster, scene } = useThree();

  useEffect(() => {
    if (!checkState) return;

    const intersects = raycaster.intersectObjects(scene.children);
    console.log("Objects = ", intersects);
    setCheckState(false);
  }, [checkState]);

  return null;
};

export default ObjectSelection;
