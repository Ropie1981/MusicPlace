import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AdminNav from "../components/Admin/AdminNav";
import { useUserContext } from "../Contexts/userContext";
import "animate.css";

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
      <Typography
        className="animate__animated animate__fadeInDown"
        variant="h4"
        color="text.main"
        sx={{ py: 2 }}
      >
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
