import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AdminNav from "../components/Admin/AdminNav";
import { useUserContext } from "../Contexts/userContext";

function Admin() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.admin !== 1) {
      navigate("/");
    }
  }, [user]);

  return (
    <Container maxWidth="xl" sx={{ mt: 2, textAlign: "center" }}>
      <Typography variant="h4" color="primary" sx={{ py: 4 }}>
        Page Administrateur
      </Typography>
      <Box fullwidth>
        <AdminNav />
      </Box>
      <Outlet />
    </Container>
  );
}

export default Admin;
