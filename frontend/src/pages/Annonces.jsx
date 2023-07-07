import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AdCard from "../components/AdCard";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";

function Annonces() {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
          {/* End hero unit */}
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
            {cards.map((card) => (
              <Grid
                item
                key={card}
                xs={12}
                sm={6}
                md={6}
                lg={4}
                justifyContent="center"
              >
                <AdCard />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default Annonces;
