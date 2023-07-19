import React, { useState, useEffect } from "react";
import axios from "axios";
// import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AdCard from "../components/AdCard";
import Categories from "../components/Categories";
import "animate.css";

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
    <Container
      maxWidth="xxl"
      disableGutters
      sx={{
        height: "100vh",
        marginTop: { lg: 6.2 },
      }}
    >
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
              className="animate__animated animate__fadeInUp"
            >
              <AdCard ad={ad} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}

export default Annonces;
