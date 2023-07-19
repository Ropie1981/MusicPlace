import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
// import Container from "@mui/material/Container";
import APIService from "../services/APIService";
import { useUserContext } from "../Contexts/userContext";

function UpdateUserModal({ open, onClose }) {
  const notifyCreation = () => toast("Votre compte a bien été modifié !");
  const notifyCreationError = () => toast("Erreur lors de la Modification");
  const { user } = useUserContext();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    firstname: `${user.firstname}`,
    lastname: `${user.lastname}`,
    city: `${user.city}`,
    phone: `${user.phone}`,
    email: `${user.email}`,
  });

  const validateForm = () => {
    // add email Validation
    return true;
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm) {
      APIService.put(`${BACKEND_URL}/users/${user.id}`, { ...formData })
        .then(() => {
          notifyCreation();
          onClose();
        })
        .catch((err) => {
          console.error(err);
          notifyCreationError();
        });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Paper elevation={4} sx={{ p: 2 }}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, mb: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstname"
                required
                fullWidth
                id="firstName"
                label="Prénom"
                autoFocus
                onChange={handleInputChange}
                value={formData.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastname"
                label="Nom"
                name="lastname"
                autoComplete="family-name"
                onChange={handleInputChange}
                value={formData.lastname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="city"
                label="Votre Ville"
                name="city"
                autoComplete="city"
                onChange={handleInputChange}
                value={formData.city}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Votre Numéro de Téléphone"
                name="phone"
                autoComplete="phone"
                onChange={handleInputChange}
                value={formData.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Adresse Mail"
                name="email"
                autoComplete="email"
                onChange={handleInputChange}
                value={formData.email}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            color="success"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Enregistrer
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}

export default UpdateUserModal;

UpdateUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
