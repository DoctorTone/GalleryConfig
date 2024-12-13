import { useDropzone } from "react-dropzone";
import Typography from "@mui/material/Typography";
import useStore from "../state/store";
import Button from "@mui/material/Button";
import { useCallback } from "react";

const DragDrop = () => {
  const setFile = useStore((state) => state.setFile);

  const dropVisible = useStore((state) => state.dropVisible);
  const toggleDragDrop = useStore((state) => state.toggleDragDrop);

  const clearFiles = () => {
    toggleDragDrop();
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    // DEBUG
    console.log("File = ", acceptedFiles[0]);
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
