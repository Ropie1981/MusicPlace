import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MusicPlaceL from "../assets/MusicPlaceL.jpg";
import MusicGear from "../assets/musicGear.jpg";
import { useUserContext } from "../Contexts/userContext";

export default function Home() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const handleLinkAds = () => {
    navigate("/annonces");
  };
  const handleLinkRegister = () => {
    navigate("/register");
  };
  const handleLinkPublish = () => {
    navigate("/publish");
  };

  return (
    <Container
      maxWidth="xxl"
      disableGutters
      sx={{
        height: "100vh",
        marginTop: { lg: 6.2 },
      }}
    >
      <Toolbar id="back-to-top-anchor" />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CardMedia
          sx={{
            height: 100,
            width: { xs: "100%", lg: "50%" },
          }}
          image={MusicPlaceL}
          title="header logo"
          align="center"
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CardMedia
          sx={{
            height: 250,
            width: { xs: "100%", lg: "50%" },
          }}
          image={MusicGear}
          title="header logo"
          align="center"
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack
          sx={{ pt: 4 }}
          direction={{ md: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" onClick={handleLinkAds}>
            Voir toutes les Annonces
          </Button>
          {!user.id ? (
            <Button
              variant="outlined"
              onClick={handleLinkRegister}
              sx={{ mt: { xs: "2" } }}
            >
              Créer un Compte
            </Button>
          ) : (
            <Button
              variant="outlined"
              sx={{ mt: { xs: 2 } }}
              onClick={handleLinkPublish}
            >
              Publier une Annonce
            </Button>
          )}
        </Stack>
      </Box>
    </Container>
  );
}
