import * as React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Navbar({ toggleColorMode }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorElNavMenu, setAnchorElNavMenu] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNavMenu(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNavMenu(null);
  };

  const handleLinkHome = () => {
    navigate("/");
  };

  const handleLinkAds = () => {
    navigate("/annonces");
  };
  const handleLinkLogin = () => {
    navigate("/login");
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
          <MenuIcon />
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
          <MenuItem onClick={handleLinkLogin}>
            <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
              Login
            </Typography>
          </MenuItem>
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
        <IconButton color="primary" disabled>
          <SearchIcon />
        </IconButton>
        <IconButton color="primary" disabled>
          <MoreIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  toggleColorMode: PropTypes.func.isRequired,
};
