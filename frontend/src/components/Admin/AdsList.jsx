import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import APIService from "../../services/APIService";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Titre", width: 120 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "price", headerName: "Prix", width: 70 },
  {
    field: "email",
    headerName: "Email",
    type: "email",
    width: 200,
  },
  {
    field: "fullName",
    headerName: "Vendeur",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstname || ""} ${params.row.lastname || ""}`,
  },
  { field: "city", headerName: "Ville", width: 100 },
  { field: "phone", headerName: "Tel", width: 130 },
];

export default function adsList() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyError = () =>
    toast.error("Problème de Récupération des Utilisateurs..");
  const [ads, setAds] = useState([]);

  const getAds = () => {
    APIService.get(`${BACKEND_URL}/ads`)
      .then((response) => {
        setAds(response.data);
      })
      .catch((error) => {
        notifyError();
        console.error(error.message);
      });
  };

  useEffect(getAds, [ads]);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        id="ads-list"
        rows={ads}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
    </Box>
  );
}
