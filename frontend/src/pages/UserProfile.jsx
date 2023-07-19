import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserInfos from "../components/UserInfos";
import MyAds from "../components/MyAds";
import { useUserContext } from "../Contexts/userContext";
import MusicPlaceL from "../assets/MusicPlaceL.jpg";

export default function UserProfile() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const handlePublishAd = () => {
    navigate("/publish");
  };

  if (!user?.id) return navigate("/login");

  return (
    <Container maxWidth="xxl" align="center">
      <UserInfos />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
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
          <Typography variant="body1" sx={{ mb: 2 }} color="text.secondary">
            {user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}{" "}
            {user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1)}
          </Typography>
          <Typography variant="body1" sx={{ my: 2 }} color="text.secondary">
            Vous avez la possibilité de :
          </Typography>
          <Button
            variant="outlined"
            onClick={handlePublishAd}
            sx={{ color: "#FDCA40" }}
          >
            Publier une Annonce
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          <MyAds user={user} />
        </Grid>
      </Grid>
    </Container>
  );
}
