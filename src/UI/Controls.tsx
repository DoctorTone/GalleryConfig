import { button, folder, useControls } from "leva";
import useStore from "../state/store";
import { toggleLights } from "../utils/Utils";
import { useEffect } from "react";

const Controls = () => {
  const setIntensity = useStore((state) => state.setIntensity);
  const dropVisible = useStore((state) => state.dropVisible);
  const setDragDrop = useStore((state) => state.setDragDrop);
  const getSelectedObject = useStore((state) => state.getSelectedObject);
  const selectedObject = useStore((state) => state.selectedObject);
  const getSelectedObjectState = useStore(
    (state) => state.getSelectedObjectState
  );
  const createSpotLight = useStore((state) => state.createSpotLight);

  const toggleDragDrop = () => {
    setDragDrop(!dropVisible);
  };

  useEffect(() => {
    const object = getSelectedObject();
    if (!object) {
      set({ useInternal: true });
      return;
    }

    const state = getSelectedObjectState(object.uuid);
    set({ useInternal: state?.useInternal });
  }, [selectedObject]);

  useControls({
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
  });

  useControls({
    Lights: folder(
      {
        AddSpotLight: button(() => createSpotLight(true)),
      },
      { collapsed: true }
    ),
  });

  const [, set] = useControls(() => ({
    Selection: folder({
      useInternal: {
        value: true,
        onChange: (value) => {
          const object = getSelectedObject();
          if (!object) return;
          toggleLights(object, value);
          const state = getSelectedObjectState(object.uuid);
          // DEBUG
          console.log("State = ", state);
          getSelectedObjectState(getSelectedObject()!.uuid!).useInternal =
            value;
        },
      },
      wireframe: {
        value: false,
      },
      locked: {
        value: false,
      },
    }),
  }));

  useControls({
    "Selected Light": folder({
      intensity: {
        value: 1,
        min: 0,
        max: 20,
        step: 0.01,
        onChange: (v) => {
          setIntensity(v);
        },
      },
    }),
  });

  return null;
};

export default Controls;
