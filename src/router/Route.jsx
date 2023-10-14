import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage";
import RoomPage from "../pages/RoomPage";
import BookingPage from "../pages/BookingPage";
import ReservationPage from "../pages/ReservationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <div>
            <HomePage />
          </div>
        ),
      },
      {
        path: "room",
        element: (
          <div>
            <RoomPage />
          </div>
        ),
      },
      {
        path: "booking",
        element: (
          <div>
            <BookingPage />
          </div>
        ),
      },
      {
        path: "reservation/:userId",
        element: (
          <div>
            <ReservationPage />
          </div>
        ),
      },
    ],
  },
]);
export default function Route() {
  return <RouterProvider router={router} />;
}
