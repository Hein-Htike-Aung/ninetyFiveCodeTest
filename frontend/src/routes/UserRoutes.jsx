import React from "react";
import { AuthContext } from "../context/auth_context";
import { Navigate, useRoutes } from "react-router";
import { useContext } from "react";
import UserLogin from "../pages/User/UserLogin/UserLogin";
import Home from "../pages/User/Home/Home";
import CustomerLayout from "../components/layout/customer-layout/CustomerLayout";
import BookOrder from "../pages/User/BookOrder/BookOrder";
import Borrow from "../pages/User/Borrow/Borrow";

const UserRoutes = () => {
  const { customer } = useContext(AuthContext);

  const ProtectedRoute = ({ children, redirectRoute }) => {
    const token = customer?.access_token;
    if (token) {
      return <div>{children}</div>;
    } else {
      return <Navigate to={redirectRoute} />;
    }
  };

  const PublicRoute = ({ children }) => {
    if (customer) return <Navigate to={"/customer/book-list"} />;
    return children;
  };

  const customerRoutes = useRoutes([
    {
      path: "/",
      element: (
        <PublicRoute>
          <UserLogin />
        </PublicRoute>
      ),
    },
    {
      path: "/customer",
      element: (
        <ProtectedRoute redirectRoute={"/customer/book-list"}>
          <CustomerLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/customer/book-list",
          element: <Home />,
        },
        {
          path: "/customer/book-order",
          element: <BookOrder />,
        },
        {
          path: "/customer/book-borrow/:bookId",
          element: <Borrow />,
        },
      ],
    },
  ]);

  return customerRoutes;
};

export default UserRoutes;
