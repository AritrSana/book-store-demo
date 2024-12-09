/** @format */

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../page/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../page/books/Cart";
import Checkout from "../page/books/Checkout";
import SingleBook from "../page/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import Orders from "../page/books/Orders";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../page/dashboard/DashboardLayout";
import Dashboard from "../page/dashboard/Dashboard";
import ManageBooks from "../page/dashboard/manageBooks/ManageBooks";
import AddBook from "../page/dashboard/addBook/AddBook";
import UpdateBook from "../page/dashboard/editBook/UpdateBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/orders", element: <Orders /> },
      { path: "/about", element: <h1>About</h1> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      { path: "/books/:id", element: <SingleBook /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: "add-new-book",
        element: (
          <AdminRoute>
            <AddBook />
          </AdminRoute>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <AdminRoute>
            <UpdateBook />
          </AdminRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminRoute>
            <ManageBooks />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
