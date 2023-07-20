import React, { useRef } from "react";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import "react-toastify/dist/ReactToastify.css";
import APIService from "../../services/APIService";
import "./DragDropFile/DragDropFile.css";

function PictureUploadModal({ adId, open, onClose }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [selectedFileName, setSelectedFileName] = React.useState("");
  const notifyUpload = () =>
    toast.success("Votre Photo a bien été enregistrée !");
  const notifyUploadError = () => toast.error("Problème à l'enregistrement !");

  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  // ref
  const inputRef = useRef();

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
    formData.append("id", adId);

    APIService.post(`${BACKEND_URL}/maPhotoAnnonce`, formData, {
      withCredentials: true,
    })
      .then(() => {
        notifyUpload();
        setSelectedFileName("");
        onClose();
      })
      .catch((error) => {
        console.error(error);
        notifyUploadError();
      });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <>
        <Typography variant="h5" color="text.primary" sx={{ m: 2 }}>
          Voulez-vous ajouter une photo à votre annonce ?
        </Typography>
        <Box sx={{ position: "relative" }}>
          <form
            id="form-file-upload"
            onDragEnter={handleDrag}
            onSubmit={handleSubmit}
          >
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
              sx={{ position: "absolute", top: 5, right: 5 }}
            >
              <CloseIcon />
            </IconButton>
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
              <div>
                <p>Vous pouvez glisser-déposer votre fichier ou:</p>
                <button
                  type="button"
                  className="upload-button"
                  onClick={onButtonClick}
                >
                  Cliquer ICI pour chercher un Fichier
                </button>{" "}
                {selectedFileName && (
                  <p>Fichier sélectionné: {selectedFileName}</p>
                )}{" "}
                {/* Display the selected file name */}
              </div>
              <IconButton
                aria-label="upload"
                type="submit"
                sx={{ py: 3, color: "black" }}
              >
                <FileUploadIcon />
                Envoyer!
              </IconButton>
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
        </Box>
      </>
    </Modal>
  );
}

export default PictureUploadModal;

PictureUploadModal.propTypes = {
  adId: PropTypes.number,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

PictureUploadModal.defaultProps = {
  adId: PropTypes.number,
};
