import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";

const categories = [
  { label: "Guitares Acoustiques", id: 1 },
  { label: "Guitares Électriques", id: 2 },
  { label: "Pianos/Clavier", id: 3 },
  { label: "Batteries/Percussions", id: 4 },
  { label: "Instruments à Vent", id: 5 },
  { label: "Cuivres", id: 6 },
  { label: "Instruments à Cordes", id: 7 },
];

export default function Categories() {
  return (
    <Stack
      sx={{ pt: 4 }}
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      justifyContent="center"
      alignItems={{ xs: "center" }}
    >
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={categories}
        renderInput={(params) => (
          <TextField
            sx={{ width: 300 }}
            label="Catégories"
            inputProps={params.inputProps}
            InputLabelProps={params.InputLabelProps}
          />
        )}
      />
      <TextField id="recherche" label={<SearchIcon />} sx={{ width: 300 }} />
    </Stack>
  );
}
