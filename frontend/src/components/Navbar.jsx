import * as React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreIcon from "@mui/icons-material/MoreVert";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import PersonIcon from "@mui/icons-material/Person";
import { useUserContext } from "../Contexts/userContext";

export default function Navbar({ toggleColorMode }) {
  const { user, logout } = useUserContext();
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorElNavMenu, setAnchorElNavMenu] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNavMenu(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNavMenu(null);
  };
  const handleLinkHome = () => {
    navigate("/");
    setAnchorElNavMenu(null);
  };
  const handleLinkAds = () => {
    navigate("/annonces");
    setAnchorElNavMenu(null);
  };
  const handleLinkLogin = () => {
    navigate("/login");
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    logout();
    setAnchorElUser(null);
  };
  const handleLinkProfile = () => {
    navigate("/profile");
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLinkPublish = () => {
    navigate("/publish");
    setAnchorElNavMenu(null);
  };

  return (
    <AppBar position="sticky" color="secondary" sx={{ top: 0, bottom: "auto" }}>
      <Toolbar>
        <IconButton
          size="large"
          aria-label="navMenu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="primary"
        >
          <QueueMusicIcon />
        </IconButton>
        <Menu
          sx={{ height: "100vh" }}
          id="NavMenu"
          anchorEl={anchorElNavMenu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNavMenu)}
          onClose={handleCloseNavMenu}
        >
          <MenuItem onClick={handleLinkHome}>
            <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
              Accueil
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleLinkAds}>
            <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
              Annonces
            </Typography>
          </MenuItem>
          {user.id ? (
            <MenuItem onClick={handleLinkPublish}>
              <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
                Publier une Annonce
              </Typography>
            </MenuItem>
          ) : null}
        </Menu>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          size="large"
          aria-label="colorMode"
          onClick={toggleColorMode}
          color="primary"
        >
          {theme.palette.mode === "light" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>

        {!user.id ? (
          <IconButton color="primary" onClick={handleOpenUserMenu}>
            <MoreIcon />
          </IconButton>
        ) : (
          <IconButton color="primary" onClick={handleOpenUserMenu}>
            <PersonIcon />
          </IconButton>
        )}
        <Menu
          sx={{ height: "100vh" }}
          id="NavMenu"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {user.id ? (
            <MenuItem onClick={handleLinkProfile}>
              <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
                Mon Compte
              </Typography>
            </MenuItem>
          ) : null}
          {!user.id ? (
            <MenuItem onClick={handleLinkLogin}>
              <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
                Login
              </Typography>
            </MenuItem>
          ) : (
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
                Logout
              </Typography>
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  toggleColorMode: PropTypes.func.isRequired,
};
