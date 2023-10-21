import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useSearch } from "../../hooks/use-search";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import AdminAction from "./AdminAction";
import { formatDate } from "../../utils/set-date";

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
    <div>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>Start Date: {formatDate(booking.startDate)}</p>
          <p>End Date: {formatDate(booking.endDate)}</p>
          <p>Payment: {booking.isPayment}</p>
          <p>
            Name: {booking.usersId.firstName} {booking.usersId.lastName}
          </p>
          <p>User Phone: {booking.usersId.phoneNumber}</p>
          <p>User Email: {booking.usersId.email}</p>
          <p>Room Number: {booking.roomsId.roomNumber}</p>
          <p>Room Type: {booking.roomsId.roomType.roomType}</p>
          <p>Room Price: {booking.roomsId.roomType?.roomPrice}</p>
          {booking.isPayment === "PENDING" && (
            <AdminAction
              bookingId={booking.id}
              fetchBookingData={fetchBookingData}
            />
          )}

          <Button onClick={() => handleDelete(booking.id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
}
