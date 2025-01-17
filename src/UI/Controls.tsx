import { button, folder, useControls } from "leva";
import useStore from "../state/store";
import { toggleLights, toggleWireframe } from "../utils/Utils";
import { useEffect } from "react";
import { LIGHTS } from "../state/Config";
import { Mesh, MeshStandardMaterial, SpotLight } from "three";
import { useFilePicker } from "use-file-picker";

const Controls = () => {
  const { openFilePicker, filesContent } = useFilePicker({ accept: ".json" });
  const setIntensity = useStore((state) => state.setIntensity);
  const toggleDragDrop = useStore((state) => state.toggleDragDrop);
  const getSelectedModel = useStore((state) => state.getSelectedModel);
  const selectedModel = useStore((state) => state.selectedModel);
  const selectedLight = useStore((state) => state.selectedLight);
  const toggleSpotlightHelper = useStore(
    (state) => state.toggleSpotlightHelper
  );
  const getSelectedLight = useStore((state) => state.getSelectedLight);
  const getSelectedModelState = useStore(
    (state) => state.getSelectedModelState
  );
  const getSelectedLightState = useStore(
    (state) => state.getSelectedLightState
  );
  const updateSpotlightHelper = useStore(
    (state) => state.updateSpotlightHelper
  );
  const createSpotLight = useStore((state) => state.createSpotLight);
  const unlockAll = useStore((state) => state.unlockAll);
  const setExport = useStore((state) => state.setExport);
  const setSceneFile = useStore((state) => state.setSceneFile);

  const toggleDrop = () => {
    toggleDragDrop();
  };

  const unlock = () => {
    unlockAll();
  };

  const exportScene = () => {
    setExport(true);
  };

  const loadScene = () => {
    openFilePicker();
  };

  useEffect(() => {
    const model = getSelectedModel();
    if (model !== null) {
      const state = getSelectedModelState(model.uuid);
      //@ts-ignore
      set({ useInternal: state?.useInternal });
      //@ts-ignore
      set({ wireframe: state?.wireframe });
      //@ts-ignore
      set({ locked: state?.locked });
    }

    const light = getSelectedLight();
    if (light !== null) {
      const state = getSelectedLightState(light.uuid);
      //@ts-ignore
      setLight({ intensity: state?.intensity });
      //@ts-ignore
      setLight({ distance: state?.distance });
      //@ts-ignore
      setLight({ angle: state?.angle });
      //@ts-ignore
      setLight({ penumbra: state?.penumbra });
      //@ts-ignore
      setLight({ helper: state?.helperVisible });
    }
  }, [selectedModel, selectedLight]);

  useEffect(() => {
    if (filesContent.length) {
      console.log("File = ", filesContent[0]);
    }
  }, [filesContent]);

  useControls({
    dragDrop: button(toggleDrop),
    unlock: button(unlock),
    export: button(exportScene),
    load: button(loadScene),
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
          const model = getSelectedModel();
          if (!model) return;
          toggleLights(model, value);
          const state = getSelectedModelState(model.uuid);
          // DEBUG
          console.log("State = ", state);
          getSelectedModelState(model.uuid)!.useInternal = value;
        },
      },
      wireframe: {
        value: false,
        onChange: (value) => {
          const model = getSelectedModel();
          if (!model) return;

          if (model.type == "Group") {
            toggleWireframe(model, value);
          } else {
            ((model as Mesh).material as MeshStandardMaterial).wireframe =
              value;
          }

          getSelectedModelState(model.uuid)!.wireframe = value;
        },
      },
      locked: {
        value: false,
        onChange: (value) => {
          const model = getSelectedModel();
          if (!model) return;

          getSelectedModelState(model.uuid)!.locked = value;
        },
      },
    }),
  }));

  const [, setLight] = useControls(() => ({
    "Selected Light": folder({
      helper: {
        value: false,
        onChange: (value) => {
          const light = getSelectedLight();
          if (!light) return;

          // Get helper
          const lightState = getSelectedLightState(light.uuid);
          lightState!.helperVisible = value;
          toggleSpotlightHelper();
        },
      },
      intensity: {
        value: LIGHTS.INTENSITY,
        min: 0,
        max: 20,
        step: 0.01,
        onChange: (value) => {
          const light = getSelectedLight();
          if (!light) return;

          getSelectedLightState(light.uuid)!.intensity = value;
          (light as SpotLight).intensity = value;
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
          (light as SpotLight).distance = value;

          updateSpotlightHelper(true);
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
          (light as SpotLight).angle = value;

          updateSpotlightHelper(true);
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
          (light as SpotLight).penumbra = value;
        },
      },
    }),
  }));

  return null;
};

export default Controls;
