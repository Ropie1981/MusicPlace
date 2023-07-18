import React from "react";
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
import DragDropFiles from "./DragDropFile/DragDropFile";
import { useUserContext } from "../Contexts/userContext";

export default function UserInfos() {
  const { user } = useUserContext();
  const [openPhoto, setOpenPhoto] = React.useState(false);

  const handlePhotoClose = () => {
    setOpenPhoto(false);
  };
  const handlePhotoOpen = () => {
    setOpenPhoto(true);
  };

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const imagePath = `${BACKEND_URL}/picture/${user.profil_picture}`;

  return (
    <Card sx={{ maxWidth: "100%", mb: { xs: 3, md: 3 } }}>
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
          <Avatar
            alt="user Picture"
            src={imagePath}
            sx={{ width: 100, height: 100 }}
          />
          <Button
            variant="text"
            color="primary"
            sx={{ fontSize: 9, fontWeight: 400, m: 1 }}
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
              <DragDropFiles handlePhotoClose={handlePhotoClose} />
            </Box>
          </Backdrop>
        </Box>

        <CardContent
          sx={{
            mr: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
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
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
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
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
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
        </CardContent>
      </Box>
    </Card>
  );
}

UserInfos.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    city: PropTypes.string,
    profile_picture: PropTypes.string,
    cv: PropTypes.string,
  }),
};

UserInfos.defaultProps = {
  user: {
    firstname: "prénom candidat",
    lastname: "nom candidat",
    email: "candidat@mail.com",
    city: "Paris",
    profile_picture: "https://xsgames.co/randomusers/avatar.php?g=female",
  },
};
