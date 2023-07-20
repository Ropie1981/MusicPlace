import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import APIService from "../../services/APIService";

export default function DeleteAdById() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [adId, setAdId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const notifyDeletion = () => toast.success("Suppression Effectuée");
  const notifyErrorDeletion = () =>
    toast.error("Problème lors de la suppression");

  const handleInputChange = (event) => {
    setAdId(parseInt(event.target.value, 10));
  };

  const openConfirmationModal = () => {
    setIsModalOpen(true);
  };
  const closeConfirmationModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteAd = (event) => {
    event.preventDefault();
    closeConfirmationModal();

    if (adId) {
      APIService.delete(`${BACKEND_URL}/ads/${adId}`)
        .then(() => {
          setAdId("");
          notifyDeletion();
        })
        .catch(() => notifyErrorDeletion());
    }
  };

  return (
    <Box>
      <Box
        component="form"
        noValidate
        onSubmit={handleDeleteAd}
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <TextField
          id="delete-ad"
          label="Entrer l'ID de l'Annonce à supprimer"
          name="id"
          sx={{ width: 250 }}
          value={adId}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
            }
          }}
        />
        <Button
          type="button"
          variant="contained"
          color="error"
          sx={{ m: 3 }}
          startIcon={<DeleteIcon />}
          onClick={openConfirmationModal}
        >
          Supprimer
        </Button>
      </Box>
      <Modal
        open={isModalOpen}
        onClose={closeConfirmationModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box
          component="form" // Convert the outer Box to form
          noValidate
          onSubmit={handleDeleteAd}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="delete-modal-title" variant="h6" component="h2">
            Confirmer la suppression
          </Typography>
          <Typography id="delete-modal-description" sx={{ mt: 2 }}>
            Êtes-vous sûr de vouloir supprimer l'annonce avec l'ID {adId} ?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button onClick={closeConfirmationModal} sx={{ mr: 2 }}>
              Annuler
            </Button>
            <Button type="submit" variant="contained" color="error">
              Confirmer
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
