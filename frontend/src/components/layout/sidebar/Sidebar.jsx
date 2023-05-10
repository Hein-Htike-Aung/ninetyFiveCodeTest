import TimelapseOutlinedIcon from "@mui/icons-material/TimelapseOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth_context";
import { ThemeContext } from "../../../context/theme_context";

const Sidebar = () => {
  const { themeMode } = useContext(ThemeContext);

  const sideBarMenus = [
    { name: "Borrow List", icons: <TimelapseOutlinedIcon />, route: "/librarian-user/borrow-list" },
    {
      name: "Books",
      icons: <WidgetsOutlinedIcon />,
      route: "/librarian-user/books",
    },
    { name: "Librarians", icons: <GroupOutlinedIcon />, route: "/librarian-user/librarians" },
    {
      name: "Customers",
      icons: <CardMembershipIcon />,
      route: "/librarian-user/customers",
    },
    { name: "Settings", icons: <SettingsOutlinedIcon />, route: "/librarian-user/settings" },
  ];

  return ( 
    <div className="sidebar">
      <Toolbar>
        <Typography variant="h6" component="div">
          {/* <div className="logo"></div> */}
          <h1>Logo</h1>
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {sideBarMenus.map((menu, idx) => (
          <NavLink
            to={menu.route}
            className={`link ${themeMode ? "menuLinkDark" : "menuLinkLight"}`}
            key={idx}
          >
            <ListItemButton>
              <ListItem disablePadding>
                <div className="menu">
                  <div className="menuIcon">{menu.icons}</div>
                  <div className="menuText">{menu.name}</div>
                </div>
              </ListItem>
            </ListItemButton>
          </NavLink>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
