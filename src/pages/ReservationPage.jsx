import { useAuth } from "../hooks/use-auth";
import axios from "../config/axios";
import { useSearch } from "../hooks/use-search";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { formatDate } from "../utils/set-date";
import { DeleteIcon } from "../icon";

export default function ReservationPage() {
  const { authUser } = useAuth();
  const { searchBooking } = useSearch();
  const [bookingData, setBookingData] = useState(null);

  const handleClickCancel = async (bookingId) => {
    try {
      await axios.delete(`/user/booking/${bookingId}`);

      const newBooking = await searchBooking(authUser.id);
      setBookingData(newBooking);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (authUser) {
        try {
          const res = await searchBooking(authUser.id);
          setBookingData(res);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchData();
  }, [authUser, searchBooking]);

  return (
    <div className="w-2/3 m-auto py-5">
      {bookingData ? (
        <div>
          <h1 className="text-xl py-4">Booking Details</h1>
          <table className="table-auto w-full text-center border border-solid bg-blue-600">
            <thead>
              <tr className="text-white">
                <th className="px-4 py-2">First name</th>
                <th className="px-4 py-2">Last name</th>
                <th className="px-4 py-2">Room Number</th>
                <th className="px-4 py-2">Room Type</th>
                <th className="px-4 py-2">Room Price</th>
                <th className="px-4 py-2">Check-in Date</th>
                <th className="px-4 py-2">Check-out Date</th>
                <th className="px-4 py-2">Payment</th>

                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.map((booking) => (
                <tr
                  key={booking.id}
                  className="border border-solid bg-gray-200"
                >
                  <td className="px-4 py-2">{authUser.firstName}</td>
                  <td className="px-4 py-2">{authUser.lastName}</td>
                  <td className="px-4 py-2">{booking.roomsId.roomNumber}</td>
                  <td className="px-4 py-2">
                    {booking.roomsId.roomType.roomType}
                  </td>
                  <td className="px-4 py-2">
                    {booking.roomsId.roomType?.roomPrice}
                  </td>
                  <td className="px-4 py-2">{formatDate(booking.startDate)}</td>
                  <td className="px-4 py-2">{formatDate(booking.endDate)}</td>
                  <td className="px-4 py-2">{booking.isPayment}</td>

                  <td className="px-4 py-2 flex gap-4 justify-center">
                    {booking.isPayment === "PENDING" && (
                      <Button onClick={() => handleClickCancel(booking.id)}>
                        <DeleteIcon />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No booking data available.</p>
      )}
    </div>
  );
}
