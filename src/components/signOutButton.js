import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function SignOutButton() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      handleClose();
      navigate("/"); // ✅ Redirige vers la page de login
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };

  return (
    <>
      {/* Bouton principal */}
      <Button
        variant="contained"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={handleOpen}
        sx={{ textTransform: "none" }}
      >
        Logout
      </Button>

      {/* Boîte de confirmation */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Confirmer la déconnexion</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder au
            tableau de bord.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSignOut} color="error" autoFocus>
            Oui, déconnecter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
