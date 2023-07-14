import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MusicPlaceL from "../assets/MusicPlaceL.jpg";
import MusicGear from "../assets/musicGear.jpg";

export default function Home() {
  const navigate = useNavigate();
  const handleLinkAds = () => {
    navigate("/annonces");
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
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" onClick={handleLinkAds}>
            Voir toutes les Annonces
          </Button>
          <Button variant="outlined">Créer un Compte</Button>
        </Stack>
      </Box>
    </Container>
  );
}
