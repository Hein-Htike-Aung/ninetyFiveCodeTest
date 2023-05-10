import { ThemeProvider } from "@emotion/react";
import { useContext } from "react";
import { useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/app.scss";
import Mui_Theme from "./assets/mui-theme";
import { ThemeContext } from "./context/theme_context";
import LibrarianRoutes from "./routes/LibrarianRoutes";
import UserRoutes from "./routes/UserRoutes";

const App = () => {
  const { themeMode } = useContext(ThemeContext);
  const location = useLocation();
  const isLibrarian = location.pathname.startsWith("/librarian");

  return (
    <ThemeProvider theme={Mui_Theme(themeMode)}>
      <ToastContainer position="bottom-center" limit={1} />
      <div className={`theme-${themeMode ? "dark" : "light"}`}>
        {isLibrarian ? <LibrarianRoutes /> : <UserRoutes />}
      </div>
    </ThemeProvider>
  );
};

export default App;
