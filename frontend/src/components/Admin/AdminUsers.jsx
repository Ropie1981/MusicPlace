import React from "react";
import Grid from "@mui/material/Grid";
import UsersList from "./UsersList";

function AdminUsers() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9}>
        <UsersList />
      </Grid>
      <Grid item xs={12} md={3}>
        delete users
      </Grid>
    </Grid>
  );
}

export default AdminUsers;
