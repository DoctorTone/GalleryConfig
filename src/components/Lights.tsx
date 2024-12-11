import useStore from "../state/store";

const Lights = () => {
  const intensity = useStore((state) => state.intensity);

  return (
    <>
      <ambientLight intensity={intensity} />
    </>
  );
};

export default Lights;
