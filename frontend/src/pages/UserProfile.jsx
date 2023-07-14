import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserInfos from "../components/UserInfos";
import { useUserContext } from "../Contexts/userContext";
import MusicPlaceL from "../assets/MusicPlaceL.jpg";

export default function UserProfile() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  if (!user?.id) return navigate("/login");

  return (
    <Container maxWidth="xxl" disableGutters align="center">
      <Typography variant="h4" sx={{ my: 2 }} color="primary">
        Mon Compte:
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              width: 400,
              display: "flex",
            }}
          >
            <img src={MusicPlaceL} alt="logo" width="100%" />
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }} color="text.secondary">
            Vous êtes connecté en tant que :
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }} color="primary">
            {user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}{" "}
            {user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <UserInfos user={user} />
        </Grid>
      </Grid>
    </Container>
  );
}
