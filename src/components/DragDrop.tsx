import { useDropzone } from "react-dropzone";
import Typography from "@mui/material/Typography";
import useStore from "../state/store";

const DragDrop = () => {
  const setFile = useStore((state) => state.setFile);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => {
    console.log("File = ", file);
    setFile(file);
  });

  return (
    <div id="drop" {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <Typography variant="h5">
        Drag and drop files here until you are finished...
      </Typography>
    </div>
  );
};

export default DragDrop;
