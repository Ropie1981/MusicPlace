import React from "react";
import Grid from "@mui/material/Grid";
import AdsList from "./AdsList";
import DeleteAdById from "./DeleteAdById";

function AdminAds() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <DeleteAdById />
      </Grid>
      <Grid item xs={12} md={9}>
        <AdsList />
      </Grid>
    </Grid>
  );
}

export default AdminAds;
