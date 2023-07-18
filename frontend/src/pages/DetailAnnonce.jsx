import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import keyboard from "../assets/keyboard.jpg";

export default function DetailAnnonce() {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();
  const [ad, setAd] = useState({});

  const getAd = () => {
    axios
      .get(`${BACKEND_URL}/ads/${id}`)
      .then((response) => {
        setAd(response.data);
      })
      .catch((error) => {
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

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Button
        type="button"
        variant="outlined"
        sx={{ color: "#FDCA40" }}
        onClick={() => navigate("/annonces")}
      >
        Retour aux Annonces
      </Button>
      <Card sx={{ width: { xs: "100%", md: "90%", lg: "80%" }, height: 650 }}>
        <CardMedia
          component="img"
          height="300"
          image={keyboard}
          alt="ad picture"
        />
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
                <Button type="button" variant="contained">
                  Contacter le Vendeur
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
