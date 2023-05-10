import React from "react";
import { useContext } from "react";
import { Navigate, useRoutes } from "react-router";
import Layout from "../components/layout/layout/Layout";
import BorrowLIst from "../pages/Librarian/BorrowList/BorrowLIst";
import LibrarianLogin from "../pages/Librarian/LibrarianLogin/LibrarianLogin";
import { AuthContext } from "../context/auth_context";
import LibraryBooks from "../pages/Librarian/LibraryBooks/LibraryBooks";
import LibrariansSettings from "../pages/Librarian/LibrariansSettings/LibrariansSettings";
import Librarians from "../pages/Librarian/Librarians/Librarians";
import CustomerList from "../pages/Librarian/CustomerList/CustomerList";
import AddBook from "../pages/Librarian/AddBook/AddBook";

const LibrarianRoutes = () => {
  const { librarian } = useContext(AuthContext);

  const ProtectedRoute = ({ children, redirectRoute }) => {
    const token = librarian?.access_token;
    if (token) {
      return <div>{children}</div>;
    } else {
      return <Navigate to={redirectRoute} />;
    }
  };

  const PublicRoute = ({ children }) => {
    if (librarian) return <Navigate to={"/librarian-user/borrow-list"} />;
    return children;
  };

  const librarianRoutes = useRoutes([
    {
      path: "/librarian",
      element: (
        <PublicRoute>
          <LibrarianLogin />
        </PublicRoute>
      ),
    },
    {
      path: "/librarian-user",
      element: (
        <ProtectedRoute redirectRoute={"/librarian/borrow-list"}>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/librarian-user/borrow-list",
          element: <BorrowLIst />,
        },
        {
          path: "/librarian-user/books",
          element: <LibraryBooks />,
        },
        {
          path: "/librarian-user/books/add-book/:bookId",
          element: <AddBook />,
        },
        {
          path: "/librarian-user/settings",
          element: <LibrariansSettings />,
        },
        {
          path: "/librarian-user/librarians",
          element: <Librarians />,
        },
        {
          path: "/librarian-user/customers",
          element: <CustomerList />,
        },
      ],
    },
  ]);

  return librarianRoutes;
};

export default LibrarianRoutes;
