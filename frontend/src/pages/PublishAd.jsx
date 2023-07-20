import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PictureUploadModal from "../components/User/PictureUploadModal";
import APIService from "../services/APIService";
import { useUserContext } from "../Contexts/userContext";

export default function PublishAd() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const notifyCreation = () =>
    toast.success(`Nouvelle Annonce Publiée au nom de ${
      user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)
    } 
  ${user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1)}`);
  const notifyCreationError = () =>
    toast.error("Problème lors de la publication");
  const [openModal, setOpenModal] = useState(false);
  const [uploadedAdId, setUploadedAdId] = useState(null);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getUTCDate();
  const newDate = `${year}-${month}-${day}`;
  const [formData, setFormData] = useState({
    user_id: `${user.id}`,
    title: "",
    price: "",
    description: "",
    picture: "",
    city: `${user.city}`,
    email: `${user.email}`,
    firstname: `${user.firstname}`,
    lastname: `${user.lastname}`,
    phone: `${user.phone}`,
    publish_date: newDate,
    terms: false,
  });

  const openUploadModal = () => {
    setOpenModal(true);
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleReturnProfile = () => {
    navigate("/profile");
  };

  const handleReturnAds = () => {
    navigate("/annonces");
  };

  const handleSubmitAd = (event) => {
    event.preventDefault();
    APIService.post(`${BACKEND_URL}/ads`, { ...formData })
      .then((response) => {
        setUploadedAdId(response.data.id);
        setFormData({
          user_id: `${user.id}`,
          title: "",
          price: "",
          description: "",
          picture: "",
          city: `${user.city}`,
          email: `${user.email}`,
          publish_date: newDate,
          terms: false,
        });
        notifyCreation();
        openUploadModal();
      })
      .catch((error) => {
        console.error(error);
        notifyCreationError();
      });
  };

  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
    }
  }, []);

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" color="primary">
          Publier une nouvelle annonce
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmitAd}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                name="title"
                required
                fullWidth
                id="title"
                label="Titre de l'Annonce"
                autoFocus
                onChange={handleInputChange}
                value={formData.title}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="price"
                required
                fullWidth
                id="price"
                label="Prix de Vente"
                autoFocus
                onChange={handleInputChange}
                value={formData.price}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="description"
                required
                fullWidth
                id="description"
                label="Description"
                multiline
                maxRows={15}
                minRows={3}
                autoFocus
                onChange={handleInputChange}
                value={formData.description}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#FDCA40",
            }}
          >
            Enregistrer
          </Button>
        </Box>
      </Box>
      <PictureUploadModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        adId={uploadedAdId}
      />
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems={{ xs: "center" }}
        sx={{ mt: 10 }}
      >
        <Button
          variant="outlined"
          onClick={handleReturnAds}
          sx={{ p: 1, color: "primary" }}
        >
          Voir les Annonces
        </Button>
        <Button variant="outlined" onClick={handleReturnProfile} sx={{ p: 1 }}>
          Retour Au Profil
        </Button>
      </Stack>
    </Container>
  );
}
