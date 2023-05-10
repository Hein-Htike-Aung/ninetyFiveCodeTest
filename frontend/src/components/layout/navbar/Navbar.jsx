import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth_context";
import "./navbar.scss";

const Navbar = ({ drawerWidth, handleDrawerToggle }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        className="appbar"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="navbarMenus">
            <img
              src={'../user-profile.png'}
              alt=""
              className="profilePic"
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
