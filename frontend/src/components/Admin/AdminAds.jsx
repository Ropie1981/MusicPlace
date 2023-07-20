import React from "react";
import Grid from "@mui/material/Grid";
import AdsList from "./AdsList";

function AdminAds() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <AdsList />
      </Grid>
    </Grid>
  );
}

export default AdminAds;
