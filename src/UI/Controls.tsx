import { button, folder, useControls } from "leva";
import useStore from "../state/store";

const Controls = () => {
  const setIntensity = useStore((state) => state.setIntensity);
  const dropVisible = useStore((state) => state.dropVisible);
  const setDragDrop = useStore((state) => state.setDragDrop);

  const toggleDragDrop = () => {
    setDragDrop(!dropVisible);
  };

  useControls(
    {
      dragDrop: button(toggleDragDrop),
      ambient: {
        value: 0.5,
        min: 0,
        max: 3,
        step: 0.01,
        onChange: (v) => {
          setIntensity(v);
        },
      },
      Selected: folder({
        useInternal: {
          value: true,
          onChange: (value) => {
            console.log("Changed it", value);
          },
        },
      }),
    },
    [dropVisible]
  );

  return null;
};

export default Controls;
