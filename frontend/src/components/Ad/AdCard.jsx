import * as React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import keyboard from "../../assets/keyboard.jpg";
import piano from "../../assets/piano.jpeg";
import guitar1 from "../../assets/gretsch.jpeg";
import bass from "../../assets/musicMan.png";
import violin from "../../assets/violin.jpeg";
import tuba from "../../assets/tuba.png";
import guitar2 from "../../assets/strat.jpeg";
import trumpet from "../../assets/trumpet.jpeg";
import trombone from "../../assets/trombone.jpeg";
import saxophone from "../../assets/sax.jpeg";
import cello from "../../assets/cello.jpeg";
import drum from "../../assets/tama-rhythm-mate.jpg";

export default function AdCard({ ad }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const handleLinkDetail = () => {
    navigate(`/annonces/${ad.id}`);
  };

  const imagesArray = {
    drum,
    tuba,
    keyboard,
    piano,
    guitar: guitar1 || guitar2,
    bass,
    saxophone,
    trombone,
    violin,
    trumpet,
    cello,
  };
  const randomIndex = Math.floor(Math.random() * imagesArray.length);
  const randomImage = imagesArray[randomIndex];
  const imagePath = `${BACKEND_URL}/picture/${ad.picture}`;

  const selectImage = (title) => {
    const lowerCaseTitle = title.toLowerCase();
    for (const key in imagesArray) {
      if (lowerCaseTitle.includes(key.toLowerCase())) {
        return imagesArray[key];
      }
    }
    return randomImage;
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleLinkDetail}>
        {ad.picture !== null ? (
          <CardMedia
            component="img"
            height="140"
            image={imagePath}
            alt="ad picture"
          />
        ) : (
          <CardMedia
            component="img"
            height="140"
            image={selectImage(ad.title)}
            alt="ad picture"
          />
        )}
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="primary"
              >
                {ad.title}
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
                  Prix:{ad.price}€
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Typography variant="body2" color="text.secondary">
            {ad.description}
          </Typography>
          <Box sx={{ pt: 1, display: "flex", justifyContent: "center" }}>
            <AdsClickIcon />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

AdCard.propTypes = {
  ad: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

AdCard.defaultProps = {
  ad: {
    title: "Ad Title",
    picture: "https://generatorfun.com/random-instrument-image",
    price: "à confirmer",
    description: "description for the ad",
  },
};
