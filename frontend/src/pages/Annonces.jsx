import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AdCard from "../components/AdCard";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";

function Annonces() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [ads, setAds] = useState([]);

  const getAds = () => {
    axios
      .get(`${BACKEND_URL}/ads`)
      .then((response) => {
        setAds(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(getAds, []);

  return (
    <>
      <Navbar />
      <Container
        maxWidth="xxl"
        disableGutters
        sx={{
          height: "100vh",
          marginTop: { lg: 6.2 },
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="primary"
          gutterBottom
        >
          Annonces
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Trouve ton matos !
        </Typography>
        <Categories />
        <Container maxWidth="xxl" sx={{ py: 8 }}>
          <Grid
            container
            spacing={4}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: { md: "center", lg: "center" },
            }}
          >
            {ads.map((ad) => (
              <Grid
                item
                key={ad.id}
                xs={12}
                sm={6}
                md={6}
                lg={4}
                justifyContent="center"
              >
                <AdCard ad={ad} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default Annonces;
