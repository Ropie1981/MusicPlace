import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import APIService from "../../services/APIService";

function AdminUpdateUserModal({ user, open, onClose }) {
  const notifyCreation = () => toast("Votre compte a bien été modifié !");
  const notifyCreationError = () => toast("Erreur lors de la Modification");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    firstname: `${user.firstname}`,
    lastname: `${user.lastname}`,
    city: `${user.city}`,
    phone: `${user.phone}`,
    email: `${user.email}`,
    admin: false,
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
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            phone: "",
            city: "",
            admin: false,
            terms: false,
          });
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
      <Box sx={{ position: "relative" }}>
        <Paper elevation={4} sx={{ p: 2 }}>
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
            sx={{ position: "absolute", top: 5, right: 5 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="text.primary">
            Mettre à Jour l'Utilisateur
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{ ml: 2 }}
                      >
                        Role:
                      </Typography>
                      <Switch
                        checked={formData.admin === 1}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            admin: event.target.checked ? 1 : 0,
                          })
                        }
                        name="admin"
                      />
                    </>
                  }
                  label="Admin"
                />
              </Grid>
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
      </Box>
    </Modal>
  );
}

export default AdminUpdateUserModal;

AdminUpdateUserModal.propTypes = {
  user: PropTypes.shape.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
