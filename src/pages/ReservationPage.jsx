import { useAuth } from "../hooks/use-auth";
import axios from "../config/axios";
import { useSearch } from "../hooks/use-search";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { formatStartDate } from "../utils/set-date";

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
    <div>
      <h1>Reservation Page</h1>
      {bookingData ? (
        <div>
          <h2>Booking Details</h2>
          {bookingData.map((booking) => (
            <div key={booking.id}>
              <p>First Name:{authUser.firstName}</p>
              <p>Last Name:{authUser.lastName}</p>
              <p>Room Type: {booking.roomType}</p>
              <p>Room Price: {booking.totalPrice}</p>
              <p>Start Date: {formatStartDate(booking.startDate)}</p>
              <p>End Date: {formatStartDate(booking.endDate)}</p>
              <Button onClick={() => handleClickCancel(booking.id)}>
                Cancel Booking
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No booking data available.</p>
      )}
    </div>
  );
}
