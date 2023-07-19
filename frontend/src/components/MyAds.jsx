import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useUserContext } from "../Contexts/userContext";

export default function MyAds() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);
  const [myAds, setMyAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (ad) => {
    setSelectedAd(ad);
    navigate(`/annonces/${ad.id}`);
  };

  const onDelete = (id) => {
    setMyAds((prevads) => prevads.filter((ad) => ad.id !== id));
  };

  const handleDelete = (id) => {
    setSelectedAd(id);
    setConfirmationOpen(true);
  };

  const handleDeleteConfirmed = () => {
    // Delete the ad from the backend
    axios
      .delete(`${BACKEND_URL}/ads/${selectedAd}`, { withCredentials: true })
      .then(() => {
        // Call the onDelete function to update the frontend
        onDelete(selectedAd);
        setConfirmationOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
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
          <Paper sx={{ height: "100%" }} elevation={3}>
            <Typography
              variant="h6"
              color="initial"
              sx={{
                p: 2,
                backgroundColor: "primary.main",
                color: "white",
                borderRadius: 2,
              }}
            >
              Mes Annonces Publiées :
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
                      elevation={5}
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
                          {ad.title}
                        </Typography>
                        <ReactQuill
                          theme="bubble"
                          value={`${ad.description.slice(0, 150)}...`}
                          readOnly
                        />
                        <Typography gutterBottom variant="h6" component="h2">
                          Prix: {ad.price}€
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => handleOpen(ad)}
                          sx={{ color: "#FDCA40" }}
                        >
                          Voir Détail
                        </Button>
                        <Button
                          onClick={() => handleDelete(ad.id)}
                          sx={{ color: "#FDCA40" }}
                        >
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
              {/* Existing code for the modal */}
            </Backdrop>
            <Modal
              open={confirmationOpen}
              onClose={handleConfirmationClose}
              aria-labelledby="confirmation-modal-title"
              aria-describedby="confirmation-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography
                  id="confirmation-modal-title"
                  variant="h6"
                  color="primary"
                  component="h2"
                  gutterBottom
                >
                  Confirm Deletion
                </Typography>
                <Typography id="confirmation-modal-description" sx={{ mb: 2 }}>
                  Are you sure you want to delete this ad?
                </Typography>
                <Button
                  onClick={handleDeleteConfirmed}
                  variant="contained"
                  color="error"
                  sx={{ mr: 2 }}
                >
                  Confirm
                </Button>
                <Button onClick={handleConfirmationClose} variant="outlined">
                  Cancel
                </Button>
              </Box>
            </Modal>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

MyAds.propTypes = {
  id: PropTypes.number,
}.isRequired;
