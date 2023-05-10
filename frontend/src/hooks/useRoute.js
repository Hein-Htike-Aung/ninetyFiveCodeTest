import { useContext } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "../pages/Home/Home";
import LibrarianHome from "../pages/Librarian/LibrarianHome/LibrarianHome";
import LibrarianLogin from "../pages/LibrarianLogin/LibrarianLogin";
import UserLogin from "../pages/User/UserLogin/UserLogin";
import { AuthContext } from "../context/auth_context";

const useRoute = () => {
  const { currentUser } = true;

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) return <Navigate to={"/login"} />;
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/user",
      children: [
        {
          path: "/user/login",
          element: <UserLogin />,
        },
      ],
    },
    {
      path: "/librarian",
      element: (
        <ProtectedRoute>
          <LibrarianHome />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/librarian_login",
          element: <LibrarianLogin />,
        },
      ],
    },
  ]);

  return router;
};

export default useRoute;
