import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useUserContext } from "../Contexts/userContext";
import UserInfos from "../components/User/UserInfos";
import MyAds from "../components/User/MyAds";
import APIService from "../services/APIService";
import MusicPlaceL from "../assets/MusicPlaceL.jpg";

export default function UserProfile() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyError = () => toast("Erreur lors de du chargement du profil");

  const handlePublishAd = () => {
    navigate("/publish");
  };

  const getUser = () => {
    APIService.get(`${BACKEND_URL}/users/${user.id}`)
      .then((response) => {
        setLoggedUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        notifyError();
        console.error(error.message);
        setLoading(false);
      });
  };

  useEffect(getUser, [loggedUser]);

  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
    } else {
      getUser();
    }
  }, [user, navigate]);

  return (
    <Container maxWidth="xxl" align="center">
      {loading ? ( // Conditional rendering based on the loading state
        <Typography variant="body1">Loading...</Typography>
      ) : (
        <>
          <UserInfos user={loggedUser} />
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
                {loggedUser.firstname.charAt(0).toUpperCase() +
                  loggedUser.firstname.slice(1)}{" "}
                {loggedUser.lastname.charAt(0).toUpperCase() +
                  loggedUser.lastname.slice(1)}
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
              <MyAds user={loggedUser} />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
