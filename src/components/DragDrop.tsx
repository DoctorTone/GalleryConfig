import { useDropzone } from "react-dropzone";
import Typography from "@mui/material/Typography";
import useStore from "../state/store";
import Button from "@mui/material/Button";

const DragDrop = () => {
  const setFile = useStore((state) => state.setFile);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const dropVisible = useStore((state) => state.dropVisible);
  const setDragDrop = useStore((state) => state.setDragDrop);

  const clearFiles = () => {
    setDragDrop(false);
    acceptedFiles.length = 0;
  };

  const files = acceptedFiles.map((file) => {
    console.log("File = ", file);
    setFile(file);
  });

  return (
    <div id="drop" className={dropVisible ? "d-block" : "d-none"}>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Typography variant="h5" sx={{ mb: 10 }}>
          Drag and drop files here until you are finished...
        </Typography>
      </div>
      <div>
        <p></p>
      </div>
      <Button variant="contained" onClick={clearFiles}>
        Done
      </Button>
    </div>
  );
};

export default DragDrop;
