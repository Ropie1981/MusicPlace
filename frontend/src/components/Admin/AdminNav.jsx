import React from "react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function AdminNav() {
  const navigate = useNavigate();
  const handleLinkUsersAdmin = () => {
    navigate("admin-users");
  };
  const handleLinkAdsAdmin = () => {
    navigate("admin-ads");
  };

  return (
    <Stack
      spacing={8}
      direction="row"
      justifyContent="center"
      alignItems="center"
      divider={<Divider light flexItem />}
      sx={{ p: 3 }}
    >
      <Button
        size="large"
        variant="text"
        sx={{
          width: 250,
          color: "#FDCA40",
          borderColor: "#FDCA40",
          "& .MuiButton:hover": {
            color: "#FDCA40",
          },
        }}
        onClick={handleLinkUsersAdmin}
      >
        Utilisateurs
      </Button>
      <Button
        size="large"
        variant="text"
        sx={{
          width: 250,
          color: "primary.light",
          borderColor: "primary.light",
        }}
        onClick={handleLinkAdsAdmin}
      >
        Annonces
      </Button>
    </Stack>
  );
}

export default AdminNav;
