import { useDropzone } from "react-dropzone";
import useStore from "../state/store";

const DragDrop = () => {
  const setFile = useStore((state) => state.setFile);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => setFile(file));

  return (
    <div id="drop" {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

export default DragDrop;
