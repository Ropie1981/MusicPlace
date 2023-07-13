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
import keyboard from "../assets/keyboard.jpg";

export default function AdCard({ ad }) {
  const navigate = useNavigate();
  const handleLinkDetail = () => {
    navigate(`/annonces/${ad.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleLinkDetail}>
        <CardMedia
          component="img"
          height="140"
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
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
