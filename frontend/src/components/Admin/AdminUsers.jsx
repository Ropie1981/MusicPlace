import React from "react";
import Grid from "@mui/material/Grid";
import UsersList from "./UsersList";

function AdminUsers() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <UsersList />
      </Grid>
    </Grid>
  );
}

export default AdminUsers;
