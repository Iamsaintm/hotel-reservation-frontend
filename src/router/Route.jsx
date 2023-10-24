import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage";
import RoomPage from "../pages/RoomPage";
import BookingPage from "../pages/BookingPage";
import ReservationPage from "../pages/ReservationPage";
import Authenticated from "../features/auth/Authenticated";
import AuthenticatedAdmin from "../features/auth/AuthenticatedAdmin";
import AuthenticatedAdminNotHome from "../features/auth/AuthenticatedAdminNotHome";
import AdminPage from "../pages/AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <AuthenticatedAdminNotHome>
            <HomePage />
          </AuthenticatedAdminNotHome>
        ),
      },
      {
        path: "room",
        element: (
          <AuthenticatedAdminNotHome>
            <RoomPage />
          </AuthenticatedAdminNotHome>
        ),
      },
      {
        path: "booking",
        element: <BookingPage />,
      },
      {
        path: "reservation/:userId",
        element: (
          <Authenticated>
            <ReservationPage />
          </Authenticated>
        ),
      },
      {
        path: "admin",
        element: (
          <AuthenticatedAdmin>
            <AdminPage />
          </AuthenticatedAdmin>
        ),
      },
    ],
  },
]);
export default function Route() {
  return <RouterProvider router={router} />;
}
