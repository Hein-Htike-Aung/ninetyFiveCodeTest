import React from "react";
import "./customer_layout.scss";
import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../../context/theme_context";

const CustomerLayout = () => {
  const { themeMode } = useContext(ThemeContext);

  return (
    <div className="customerLayout">
      <nav className="customerLayoutNavbar">
        <ul className="navItem">
          <li>
            <NavLink
              className={`link ${themeMode ? "menuLinkDark" : "menuLinkLight"}`}
              to={"/customer/book-list"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`link ${themeMode ? "menuLinkDark" : "menuLinkLight"}`}
              to={"/customer/book-order"}
            >
              Borrow Books
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="customerLayoutContainer">
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerLayout;
