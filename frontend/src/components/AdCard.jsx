import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import keyboard from "../assets/keyboard.jpg";

export default function AdCard() {
  const navigate = useNavigate();
  const handleLinkDetail = () => {
    navigate("/detail-annonce");
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
          <Typography gutterBottom variant="h5" component="div">
            Titre de l'Annonce
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi
            doloribus perferendis dolor saepe voluptatem laborum omnis
            laboriosam, dolorem nisi in debitis nostrum corporis eligendi.
            Minima nobis magni ex illum. Incidunt nemo tenetur, quae amet fugiat
            quia unde impedit eligendi consequuntur corporis ea veritatis.
            Facere, quidem aspernatur exercitationem quia quisquam sapiente.
          </Typography>
          <Box sx={{ pt: 1, display: "flex", justifyContent: "center" }}>
            <AdsClickIcon />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
