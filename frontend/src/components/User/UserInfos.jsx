import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import DragDropFiles from "./DragDropFile/DragDropFile";
import UpdateUserModal from "./UpdateUserModal";
import "animate.css";

export default function UserInfos({ user }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [openPhoto, setOpenPhoto] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const imagePath = `${BACKEND_URL}/picture/${user.profile_picture}`;

  const openUpdateModal = () => {
    setOpenModal(true);
  };

  const handlePhotoClose = () => {
    setOpenPhoto(false);
  };
  const handlePhotoOpen = () => {
    setOpenPhoto(true);
  };

  return (
    <Card
      sx={{ maxWidth: "100%", mb: { xs: 3, md: 3 } }}
      className="animate__animated animate__fadeInDown"
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography gutterBottom variant="h4" component="div" sx={{ ml: 2 }}>
          {user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}{" "}
          {user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1)}
        </Typography>
        <Box
          sx={{
            m: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {imagePath && (
            <Avatar
              alt="user Picture"
              src={imagePath}
              sx={{ width: 100, height: 100 }}
            />
          )}
          <Button
            variant="text"
            color="primary"
            sx={{ fontSize: 9, fontWeight: 400, m: 1, color: "#FDCA40" }}
            onClick={handlePhotoOpen}
          >
            changer ma photo
          </Button>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 10,
            }}
            open={openPhoto}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DragDropFiles handlePhotoClose={handlePhotoClose} user={user} />
            </Box>
          </Backdrop>
        </Box>
        <CardContent
          sx={{
            mr: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-evenly",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", ml: 0.8 }}>
            <LocationCityIcon />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ ml: 1 }}
              gutterBottom
            >
              {user.city.charAt(0).toUpperCase() + user.city.slice(1)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-start", ml: 0.8 }}>
            <MailIcon />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ ml: 1 }}
              gutterBottom
            >
              {user.email}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-start", ml: 0.8 }}>
            <PhoneIcon />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ ml: 1 }}
              gutterBottom
            >
              {user.phone}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Button
              variant="text"
              onClick={openUpdateModal}
              sx={{
                color: "#FDCA40",
                fontSize: 11,
                fontWeight: 400,
                mt: 3,
              }}
            >
              <EditIcon sx={{ mr: 1 }} /> Modifier mes Infos
            </Button>
          </Box>
        </CardContent>
      </Box>

      <UpdateUserModal open={openModal} onClose={() => setOpenModal(false)} />
    </Card>
  );
}

UserInfos.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    profile_picture: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
};

UserInfos.defaultProps = {
  user: PropTypes.shape({
    firstname: "USER FIRSTNAME",
    lastname: "USER LASTNAME",
    profile_picture: "https://source.unsplash.com/random/user",
    city: "Location",
    email: "example@mail.com",
    phone: "0102030405",
  }),
};
