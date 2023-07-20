import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function ContactSellerModal({
  ad,
  open,
  onClose,
  onSendMessage,
}) {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    onSendMessage(message);
    setMessage("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="contact-seller-modal"
      aria-describedby="contact-seller-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 400,
        }}
      >
        <h2 id="contact-seller-modal">
          Envoyer un Mail à{" "}
          {ad.firstname.charAt(0).toUpperCase() + ad.firstname.slice(1)}{" "}
          {ad.lastname.charAt(0).toUpperCase() + ad.lastname.slice(1)}
        </h2>
        <TextField
          multiline
          rows={4}
          variant="outlined"
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleSendMessage} sx={{ my: 2 }}>
          Envoyer
        </Button>
      </Box>
    </Modal>
  );
}

ContactSellerModal.propTypes = {
  ad: PropTypes.shape,
  open: PropTypes.func,
  onClose: PropTypes.func,
  onSendMessage: PropTypes.func,
}.isRequired;
