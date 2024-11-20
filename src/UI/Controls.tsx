import { useControls } from "leva";
import useStore from "../state/store";

const Controls = () => {
  const setIntensity = useStore((state) => state.setIntensity);
  useControls({
    ambient: {
      value: 0.5,
      min: 0,
      max: 3,
      step: 0.01,
      onChange: (v) => {
        setIntensity(v);
      },
    },
  });

  return null;
};

export default Controls;
