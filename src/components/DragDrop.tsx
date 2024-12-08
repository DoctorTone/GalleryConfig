import { useDropzone } from "react-dropzone";
import Typography from "@mui/material/Typography";
import useStore from "../state/store";
import Button from "@mui/material/Button";
import { div } from "three/webgpu";

const DragDrop = () => {
  const setFile = useStore((state) => state.setFile);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => {
    console.log("File = ", file);
    setFile(file);
  });

  return (
    <div id="drop">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Typography variant="h5" sx={{ mb: 10 }}>
          Drag and drop files here until you are finished...
        </Typography>
      </div>
      <div>
        <p></p>
      </div>
      <Button variant="contained">Done</Button>
    </div>
  );
};

export default DragDrop;
