import { button, folder, useControls } from "leva";
import useStore from "../state/store";
import { toggleLights } from "../utils/Utils";
import { useEffect } from "react";
import { LIGHTS } from "../state/Config";

const Controls = () => {
  const setIntensity = useStore((state) => state.setIntensity);
  const dropVisible = useStore((state) => state.dropVisible);
  const setDragDrop = useStore((state) => state.setDragDrop);
  const getSelectedModel = useStore((state) => state.getSelectedModel);
  const selectedModel = useStore((state) => state.selectedModel);
  const selectedLight = useStore((state) => state.selectedLight);
  const getSelectedLight = useStore((state) => state.getSelectedLight);
  const getSelectedModelState = useStore(
    (state) => state.getSelectedModelState
  );
  const getSelectedLightState = useStore(
    (state) => state.getSelectedLightState
  );
  const createSpotLight = useStore((state) => state.createSpotLight);

  const toggleDragDrop = () => {
    setDragDrop(!dropVisible);
  };

  useEffect(() => {
    const model = getSelectedModel();
    if (model !== null) {
      const state = getSelectedModelState(model.uuid);
      set({ useInternal: state?.useInternal });
    }
  }, [selectedModel, selectedLight]);

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
          const object = getSelectedModel();
          if (!object) return;
          toggleLights(object, value);
          const state = getSelectedModelState(object.uuid);
          // DEBUG
          console.log("State = ", state);
          getSelectedModelState(getSelectedModel()!.uuid!).useInternal = value;
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
        value: LIGHTS.INTENSITY,
        min: 0,
        max: 20,
        step: 0.01,
        onChange: (value) => {
          const light = getSelectedLight();
          if (!light) return;

          getSelectedLightState(light.uuid)!.intensity = value;
          light.intensity = value;
        },
      },
      distance: {
        value: LIGHTS.DISTANCE,
        min: 0,
        max: 20,
        step: 0.01,
        onChange: (value) => {
          const light = getSelectedLight();
          if (!light) return;

          getSelectedLightState(light.uuid)!.distance = value;
          light.distance = value;
        },
      },
      angle: {
        value: LIGHTS.ANGLE,
        min: 0,
        max: Math.PI / 2,
        step: 0.01,
        onChange: (value) => {
          const light = getSelectedLight();
          if (!light) return;

          getSelectedLightState(light.uuid)!.angle = value;
          light.angle = value;
        },
      },
      penumbra: {
        value: LIGHTS.PENUMBRA,
        min: 0,
        max: 1,
        step: 0.01,
        onChange: (value) => {
          const light = getSelectedLight();
          if (!light) return;

          getSelectedLightState(light.uuid)!.penumbra = value;
          light.penumbra = value;
        },
      },
    }),
  });

  return null;
};

export default Controls;
