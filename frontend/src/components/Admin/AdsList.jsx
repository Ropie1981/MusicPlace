import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import APIService from "../../services/APIService";
import ConfirmationModal from "./ConfirmationModal";

export default function AdsList() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyError = () =>
    toast.error("Problème de Récupération des Utilisateurs..");
  const [ads, setAds] = useState([]);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedadId, setSelectedadId] = useState(null);

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

  useEffect(() => {
    getAds();
  }, []);

  const handleDelete = (adId) => {
    setSelectedadId(adId);
    setConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    APIService.delete(`${BACKEND_URL}/ads/${selectedadId}`)
      .then(() => {
        setAds((prevads) => prevads.filter((ad) => ad.id !== selectedadId));
        toast.success(`l'annonce ${selectedadId} a bien été effacée`);
      })
      .catch((error) => {
        notifyError();
        console.error(error.message);
      })
      .finally(() => {
        setConfirmationModalOpen(false);
        setSelectedadId(null);
      });
  };

  const handleCancelDelete = () => {
    setConfirmationModalOpen(false);
    setSelectedadId(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Titre", width: 120 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "price", headerName: "Prix", width: 100 },
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
    { field: "city", headerName: "Ville", width: 130 },
    { field: "phone", headerName: "Tel", width: 130 },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        id="ads-list"
        rows={ads}
        columns={columns}
        pageSize={10}
        pagination
        autoHeight
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
      <ConfirmationModal
        open={confirmationModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
