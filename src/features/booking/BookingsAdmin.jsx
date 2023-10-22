import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useSearch } from "../../hooks/use-search";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import AdminAction from "./AdminAction";
import { formatDate } from "../../utils/set-date";
import { DeleteIcon } from "../../icon";

export default function BookingsAdmin() {
  const { searchAllBooking } = useSearch();
  const [bookings, setBookings] = useState([]);

  const deleteBooking = async (bookingId) => {
    try {
      await axios.delete(`/admin/booking/${bookingId}`);
      toast.success("booking delete successfully");
    } catch (error) {
      console.error("Error creating booking: ", error);
      toast.error("Error creating booking");
    }
  };

  const fetchBookingData = async () => {
    try {
      const bookingData = await searchAllBooking();
      setBookings(bookingData);
    } catch (error) {
      console.error("Error fetching booking data: ", error);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, []);

  const handleDelete = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      fetchBookingData();
    } catch (error) {
      console.error("Error deleting booking: ", error);
    }
  };

  return (
    <div className="w-10/12 m-auto py-20">
      <h1 className="text-xl py-2">Booking Details</h1>
      <table className="table-auto w-full text-center border border-solid bg-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Check-in Date</th>
            <th className="px-4 py-2">Check-out Date</th>
            <th className="px-4 py-2">Room Number</th>
            <th className="px-4 py-2">Room Type</th>
            <th className="px-4 py-2">Room Price</th>
            <th className="px-4 py-2">Payment</th>
            <th className="px-4 py-2">Maintenance</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border border-solid bg-gray-200">
              <td className="px-4 py-2">{booking.id}</td>
              <td className="px-4 py-2">
                {booking.usersId.firstName} {booking.usersId.lastName}
              </td>
              <td className="px-4 py-2">{booking.usersId.phoneNumber}</td>
              <td className="px-4 py-2">{booking.usersId.email}</td>
              <td className="px-4 py-2">{formatDate(booking.startDate)}</td>
              <td className="px-4 py-2">{formatDate(booking.endDate)}</td>

              <td className="px-4 py-2">{booking.roomsId.roomNumber}</td>
              <td className="px-4 py-2">{booking.roomsId.roomType.roomType}</td>
              <td className="px-4 py-2">
                {booking.roomsId.roomType?.roomPrice}
              </td>
              <td className="px-4 py-2">{booking.isPayment}</td>
              <td className="px-4 py-2 flex gap-4 justify-center">
                {booking.isPayment === "PENDING" && (
                  <AdminAction
                    bookingId={booking.id}
                    fetchBookingData={fetchBookingData}
                  />
                )}
                <Button onClick={() => handleDelete(booking.id)}>
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
