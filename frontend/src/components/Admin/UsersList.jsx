import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import APIService from "../../services/APIService";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstname", headerName: "First name", width: 120 },
  { field: "lastname", headerName: "Last name", width: 120 },
  {
    field: "email",
    headerName: "Email",
    type: "email",
    width: 200,
  },
  { field: "city", headerName: "City", width: 100 },
  { field: "phone", headerName: "Phone", width: 130 },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstname || ""} ${params.row.lastname || ""}`,
  },
];

export default function UsersList() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyError = () =>
    toast.error("Problème de Récupération des Utilisateurs..");
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    APIService.get(`${BACKEND_URL}/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        notifyError();
        console.error(error.message);
      });
  };

  useEffect(getUsers, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        id="users-list"
        rows={users}
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
          borderColor: "#FDCA40",
          "& .MuiDataGrid-cell:hover": {
            color: "#FDCA40",
          },
        }}
      />
    </Box>
  );
}
