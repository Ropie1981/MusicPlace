import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Navbar from "../components/Navbar";
import keyboard from "../assets/keyboard.jpg";

export default function DetailAnnonce() {
  return (
    <>
      <Navbar />
      <Container
        maxWidth="xxl"
        disableGutters
        sx={{
          height: "100vh",
          marginTop: { lg: 6.2 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card sx={{ width: { xs: "100%", md: "90%", lg: "80%" } }}>
          <CardMedia
            component="img"
            height="300"
            image={keyboard}
            alt="ad picture"
          />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="primary"
                >
                  Titre de l'Annonce
                </Typography>
              </Grid>
              <Grid item xs={4}>
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
                    Prix: 140€
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Excepturi doloribus perferendis dolor saepe voluptatem laborum
                  omnis laboriosam, dolorem nisi in debitis nostrum corporis
                  eligendi. Minima nobis magni ex illum. Incidunt nemo tenetur,
                  quae amet fugiat quia unde impedit eligendi consequuntur
                  corporis ea veritatis. Facere, quidem aspernatur
                  exercitationem quia quisquam sapiente.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
