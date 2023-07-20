import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { toast } from "react-toastify";
import ContactSellerModal from "../components/Ad/ContactSellerModal";
import APIService from "../services/APIService";
import { useUserContext } from "../Contexts/userContext";
import keyboard from "../assets/keyboard.jpg";
import piano from "../assets/piano.jpeg";
import guitar1 from "../assets/gretsch.jpeg";
import bass from "../assets/musicMan.png";
import violin from "../assets/violin.jpeg";
import tuba from "../assets/tuba.png";
import guitar2 from "../assets/strat.jpeg";
import trumpet from "../assets/trumpet.jpeg";
import trombone from "../assets/trombone.jpeg";
import saxophone from "../assets/sax.jpeg";
import cello from "../assets/cello.jpeg";
import drum from "../assets/tama-rhythm-mate.jpg";

export default function DetailAnnonce() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();
  const [ad, setAd] = useState({});
  const [showModal, setShowModal] = useState(false);
  const notifyError = () => toast.error("Erreur lors de du chargement");
  const notifyMail = () => toast("Email Envoyé !");
  const notifyMailError = () =>
    toast.error("Problème lors de l'envoi du Message !");

  const getAd = () => {
    APIService.get(`${BACKEND_URL}/ads/${id}`)
      .then((response) => {
        setAd(response.data);
      })
      .catch((error) => {
        notifyError();
        console.error(error.message);
      });
  };

  useEffect(getAd, [id]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateString = `${ad.publish_date}`;
  const dateObject = new Date(dateString);
  const formattedDate = dateObject.toLocaleDateString("fr-FR", options);

  const handleSendMessage = async (message) => {
    try {
      const emailData = {
        to: "pierre.saumont@gmail.com",
        subject: `Au sujet de votre Annonce MusicPlace: ${ad.title}`,
        text: message,
        html: `<p>${message}</p>`,
      };

      const response = await APIService.post(
        `${BACKEND_URL}/sendemail`,
        emailData
      );

      console.warn(response.data);
      notifyMail();
      setShowModal(false);
    } catch (error) {
      console.error(error);
      notifyMailError();
    }
  };

  const imagesArray = {
    drum,
    tuba,
    keyboard,
    piano,
    guitar: guitar1 || guitar2,
    bass,
    saxophone,
    trombone,
    violin,
    trumpet,
    cello,
  };
  const randomIndex = Math.floor(Math.random() * imagesArray.length);
  const randomImage = imagesArray[randomIndex];
  const imagePath = `${BACKEND_URL}/picture/${ad.picture}`;

  const selectImage = (title) => {
    const lowerCaseTitle = title.toLowerCase();
    for (const key in imagesArray) {
      if (lowerCaseTitle.includes(key.toLowerCase())) {
        return imagesArray[key];
      }
    }
    return randomImage;
  };

  return (
    <Container
      maxWidth="lg"
      disableGutters
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="center"
      >
        <Button
          type="button"
          variant="outlined"
          sx={{ color: "#FDCA40" }}
          onClick={() => navigate("/annonces")}
        >
          Retour aux Annonces
        </Button>
        {user.id && (
          <Button
            type="button"
            variant="outlined"
            sx={{ color: "#FDCA40" }}
            onClick={() => navigate("/profile")}
          >
            Retour au Profil
          </Button>
        )}
      </Stack>
      <Card sx={{ width: { xs: "100%", md: "90%", lg: "80%" }, height: 650 }}>
        {ad.picture !== null ? (
          <CardMedia
            component="img"
            height="340"
            image={imagePath}
            alt="ad picture"
          />
        ) : (
          <CardMedia
            component="img"
            height="140"
            image={selectImage(ad.title)}
            alt="ad picture"
          />
        )}
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={8}>
              <Typography
                gutterBottom
                variant="h3"
                component="div"
                color="primary"
              >
                {ad.title}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                elevation={5}
              >
                <Typography variant="h6" color="primary">
                  Prix: {ad.price}€
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body1" color="primary">
                Date de Publication:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formattedDate}
              </Typography>
              <Typography variant="body1" color="primary">
                Lieu de la Vente:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {ad.city}
              </Typography>
              <Typography variant="body1" color="primary">
                Description:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {ad.description}
              </Typography>
              <Typography variant="body1" color="primary">
                Vendeur: {ad.firstname} {ad.lastname}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                elevation={5}
              >
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => setShowModal(true)}
                >
                  Contacter le Vendeur
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ContactSellerModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSendMessage={handleSendMessage}
        ad={ad}
      />
    </Container>
  );
}
