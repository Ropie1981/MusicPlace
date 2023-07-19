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
      sx={{ p: 4 }}
    >
      <Button
        size="large"
        variant="outlined"
        sx={{ width: 250 }}
        onClick={handleLinkUsersAdmin}
      >
        Utilisateurs
      </Button>
      <Button
        size="large"
        variant="outlined"
        sx={{ width: 250 }}
        onClick={handleLinkAdsAdmin}
      >
        Annonces
      </Button>
    </Stack>
  );
}

export default AdminNav;
