// src/components/Login.js
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Connexion avec Google
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard"); // redirige après connexion
    } catch (err) {
      setError("Erreur de connexion Google !");
    } finally {
      setLoading(false);
    }
  };

  // Connexion email / mot de passe
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #6B0F9C, #B91372)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ width: 350, borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h6" textAlign="center" fontWeight={600} gutterBottom>
            Login with
          </Typography>

          <Box display="flex" justifyContent="center" gap={2} mb={2}>
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{
                backgroundColor: "#DB4437",
                "&:hover": { backgroundColor: "#C23321" },
                borderRadius: "50%",
                width: 48,
                height: 48,
                minWidth: 0,
              }}
            />
          </Box>

          <Divider sx={{ my: 2 }}>or</Divider>

          <form onSubmit={handleEmailLogin}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              size="small"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              size="small"
            />
            {error && (
              <Typography color="error" variant="body2" mt={1}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#00AEEF",
                "&:hover": { backgroundColor: "#0095CC" },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "LOGIN"}
            </Button>
          </form>

          <Typography variant="body2" color="textSecondary" textAlign="center" mt={3}>
            Looking to{" "}
            <a href="/register" style={{ color: "#00AEEF", textDecoration: "none" }}>
              create an account?
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
