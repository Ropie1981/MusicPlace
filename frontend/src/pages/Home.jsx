import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
        marginTop: { lg: 3 },
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
          spacing={4}
          justifyContent="center"
        >
          <Button
            variant="contained"
            onClick={handleLinkAds}
            sx={{ backgroundColor: "#FDCA40" }}
          >
            Voir toutes les Annonces
          </Button>
          {!user.id ? (
            <Button
              variant="outlined"
              onClick={handleLinkRegister}
              sx={{ mt: { xs: 2 }, backgroundColor: "#FDCA40" }}
            >
              Créer un Compte
            </Button>
          ) : (
            <Button
              variant="outlined"
              sx={{ mt: { xs: 2 }, color: "#FDCA40" }}
              onClick={handleLinkPublish}
            >
              Publier une Annonce
            </Button>
          )}
        </Stack>
      </Box>
      <Box>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ px: { xs: 4, md: 8, lg: 12 }, py: 3, textAlign: "center" }}
        >
          Bienvenue sur notre site de vente d'instruments et de matériel de
          production musicale d'occasion ! <br />
          Que vous soyez musicien professionnel, amateur passionné ou simplement
          à la recherche d'équipements de qualité à des prix abordables, vous
          êtes au bon endroit.
          <br /> Nous nous engageons à offrir une vaste sélection d'instruments
          de musique et d'équipements de production musicale d'occasion,
          provenant de différentes marques renommées. <br />
          Que vous cherchiez une guitare, une batterie, un clavier, une table de
          mixage ou tout autre équipement, vous trouverez certainement votre
          bonheur parmi notre inventaire diversifié.
        </Typography>
      </Box>
    </Container>
  );
}
