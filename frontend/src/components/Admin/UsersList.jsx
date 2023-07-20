import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import APIService from "../../services/APIService";
import ConfirmationModal from "./ConfirmationModal";
import AdminUpdateUserModal from "./AdminUpdateUserModal";

export default function UsersList() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyError = () =>
    toast.error("Problème de Récupération des Utilisateurs..");
  const [users, setUsers] = useState([]);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = (userId) => {
    setSelectedUserId(userId);
    setConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Make an API call to delete the user from the database
    APIService.delete(`${BACKEND_URL}/users/${selectedUserId}`)
      .then(() => {
        // Remove the deleted user from the local state
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== selectedUserId)
        );
        toast.success("User deleted successfully.");
      })
      .catch((error) => {
        notifyError();
        console.error(error.message);
      })
      .finally(() => {
        setConfirmationModalOpen(false);
        setSelectedUserId(null);
      });
  };

  const handleCancelDelete = () => {
    setConfirmationModalOpen(false);
    setSelectedUserId(null);
  };

  const handleUpdateButtonClick = (user) => {
    setIsModalOpen(true);
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstname", headerName: "First name", width: 120 },
    { field: "lastname", headerName: "Last name", width: 150 },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 180,
    },
    { field: "city", headerName: "City", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstname || ""} ${params.row.lastname || ""}`,
    },
    {
      field: "update",
      headerName: "Update",
      width: 100,
      renderCell: (params) => (
        <Button onClick={() => handleUpdateButtonClick(params.row)}>
          Update
        </Button>
      ),
    },
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
        id="users-list"
        rows={users}
        columns={columns}
        pageSize={10}
        pagination
        autoHeight
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "#FDCA40",
          "& .MuiDataGrid-cell:hover": {
            color: "#FDCA40",
          },
        }}
      />
      <ConfirmationModal
        open={confirmationModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      {isModalOpen && (
        <AdminUpdateUserModal
          open={isModalOpen}
          onClose={handleCloseModal}
          user={selectedUser}
        />
      )}
    </Box>
  );
}
