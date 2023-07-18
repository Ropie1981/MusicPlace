import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useUserContext } from "../Contexts/userContext";

export default function MyAds() {
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);
  const [myAds, setMyAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (ad) => {
    setSelectedAd(ad);
    setOpen(true);
  };

  const onDelete = (id) => {
    setMyAds((prevads) => prevads.filter((ad) => ad.id !== id));
  };

  const handleDelete = (id) => {
    // Delete the ad from the backend
    axios
      .delete(`${BACKEND_URL}/ads/${id}`, { withCredentials: true })
      .then(() => {
        // Call the onDelete function to update the frontend
        onDelete(id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BACKEND_URL}/user-ads/${user.id}`,
    headers: {},
  };

  const getMyAds = () => {
    axios
      .request(config)
      .then((response) => {
        setMyAds(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getMyAds();
  }, []);

  return (
    <Box sx={{ borderRadius: "1rem" }}>
      <Grid container spacing={4} justifyContent="flex-end">
        <Grid item xl={16} lg={12} elevation={3}>
          <Paper sx={{ height: "100%" }}>
            <Typography
              variant="h6"
              color="initial"
              sx={{
                p: 2,
                backgroundColor: "#FFAD0D",
                color: "white",
                borderRadius: 2,
              }}
            >
              Mes Annonces
            </Typography>
            {myAds.length === 0 ? (
              <Typography variant="body1" sx={{ p: 2 }}>
                Aucune offre publiée.
              </Typography>
            ) : (
              <Grid container spacing={2} sx={{ p: 2 }}>
                {myAds.map((ad) => (
                  <Grid item key={ad.id} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          // 16:9
                          pt: "56.25%",
                        }}
                        image="https://source.unsplash.com/random?wallpapers"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {ad.name}
                        </Typography>
                        <ReactQuill
                          theme="bubble"
                          value={`${ad.description.slice(0, 150)}...`}
                          readOnly
                        />
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={() => handleOpen(ad)}>
                          View
                        </Button>
                        <Button onClick={() => handleDelete(ad.id)}>
                          Supprimer l'offre
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={open}
              onClick={handleClose}
            >
              <Box
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  marginRight: "1rem",
                  marginLeft: "1rem",
                  overflow: "auto",
                  maxHeight: "600px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#888888 #f5f5f5",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f5f5f5",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888888",
                    borderRadius: "3px",
                  },
                  "@media (min-width: 768px)": {
                    marginRight: "3rem",
                    marginLeft: "3rem",
                  },
                }}
              >
                {selectedAd && (
                  <Box
                    sx={{
                      "@media (min-width: 768px)": {
                        display: "flex",
                      },
                    }}
                  >
                    <CardContent>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{
                          height: "77px",
                          width: "77px",
                          position: "absolute",
                          mt: "-50px",
                          mx: "auto",
                          left: 0,
                          right: 0,
                        }}
                      />
                      <Typography gutterBottom variant="h5" component="h2">
                        {selectedAd.name}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h3">
                        {selectedAd.title}
                      </Typography>
                      <ReactQuill
                        theme="bubble"
                        value={selectedAd.description}
                        readOnly
                      />
                      <ReactQuill
                        theme="bubble"
                        value={selectedAd.requirements}
                        readOnly
                      />
                      <Button onClick={() => handleDelete(selectedAd.id)}>
                        Supprimer l'offre
                      </Button>
                    </CardContent>
                    <CardContent>
                      <Paper
                        sx={{
                          borderRadius: "0.8rem",
                          border: "0.1px solid grey",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <Typography
                          sx={{
                            marginBottom: "0.2rem",
                            marginLeft: "0.5rem",
                            marginRight: "0.5rem",
                          }}
                        >
                          {selectedAd.category}
                        </Typography>
                      </Paper>
                      <Paper
                        sx={{
                          borderRadius: "0.8rem",
                          border: "0.1px solid grey",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <Typography sx={{ marginBottom: "0.2rem" }}>
                          {selectedAd.location}
                        </Typography>
                      </Paper>
                      <Paper
                        sx={{
                          borderRadius: "0.8rem",
                          border: "0.1px solid grey",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <Typography sx={{ marginBottom: "0.2rem" }}>
                          {selectedAd.type}
                        </Typography>
                      </Paper>
                      <Paper
                        sx={{
                          borderRadius: "0.8rem",
                          border: "0.1px solid grey",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <Typography sx={{ marginBottom: "0.2rem" }}>
                          {selectedAd.remote}
                        </Typography>
                      </Paper>
                      <Paper
                        sx={{
                          borderRadius: "0.8rem",
                          border: "0.1px solid grey",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <Typography sx={{ marginBottom: "0.2rem" }}>
                          {selectedAd.salary}
                        </Typography>
                      </Paper>
                      <Paper
                        sx={{
                          borderRadius: "0.8rem",
                          border: "0.1px solid grey",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <Typography
                          sx={{ marginLeft: "1rem", marginRight: "1rem" }}
                        >
                          {selectedAd.posting_date}
                        </Typography>
                      </Paper>
                      <Link
                        href={selectedAd.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ marginTop: "1rem" }}
                        >
                          Site Web
                        </Button>
                      </Link>

                      <Button
                        href={`mailto:${selectedAd.email}`}
                        variant="contained"
                        size="small"
                        sx={{ marginTop: "1rem", marginLeft: "0.5rem" }}
                      >
                        Nous contacter
                      </Button>
                    </CardContent>
                  </Box>
                )}
              </Box>
            </Backdrop>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

MyAds.propTypes = {
  id: PropTypes.number,
}.isRequired;
