import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CloseIcon from "@mui/icons-material/Close";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../../Contexts/userContext";
import "./DragDropFile.css";

// drag drop file component
export default function DragDropFile({ handlePhotoClose }) {
  const { user, login } = useUserContext();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [selectedFileName, setSelectedFileName] = React.useState("");
  const notifyUpload = () =>
    toast.success("Votre Photo a bien été enregistrée !");
  const notifyUploadError = () => toast.error("Problème à l'enregistrement !");

  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  // ref
  const inputRef = React.useRef();

  const handleFiles = (files) => {
    const selectedFile = files[0];
    setSelectedFileName(selectedFile.name); // Set the selected file name
    inputRef.current.files = files;
  };

  // handle drag events
  // eslint-disable-next-line func-names
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  // eslint-disable-next-line func-names
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  // eslint-disable-next-line func-names
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("maPhoto", inputRef.current.files[0]);

    axios
      .post(`${BACKEND_URL}/maPhoto`, formData, { withCredentials: true })
      .then((response) => {
        notifyUpload();
        login({ ...user, profil_picture: response.data.photoPath });
        handlePhotoClose();
        setSelectedFileName("");
      })
      .catch((error) => {
        console.error(error);
        notifyUploadError();
      });
  };

  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        type="file"
        name="maPhoto"
        id="input-file-upload"
        multiple
        onChange={handleChange}
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : ""}
      >
        <IconButton aria-label="delete" sx={{ alignSelf: "flex-end" }}>
          {" "}
          <CloseIcon color="secondary" />
        </IconButton>
        <div>
          <p>Drag and drop your file here or</p>
          <button
            type="button"
            className="upload-button"
            onClick={onButtonClick}
          >
            Upload a picture for your Ad & click Send
          </button>{" "}
          {selectedFileName && <p>Selected file: {selectedFileName}</p>}{" "}
          {/* Display the selected file name */}
          <IconButton
            aria-label="upload"
            type="submit"
            sx={{ py: 3, color: "black" }}
          >
            <FileUploadIcon />
            Send!
          </IconButton>
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        />
      )}
    </form>
  );
}

DragDropFile.propTypes = {
  handlePhotoClose: PropTypes.func.isRequired,
};
