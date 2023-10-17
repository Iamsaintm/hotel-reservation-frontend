import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { toast } from "react-toastify";
import axios from "../config/axios";
import { useAuth } from "../hooks/use-auth";
import { useState } from "react";

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomData, reservationData } = location.state;

  const { authUser } = useAuth();
  const [input, setInput] = useState({
    startDate: reservationData.startDate,
    endDate: reservationData.endDate,
    userId: authUser.id,
    roomId: roomData.id,
    guest: reservationData.guestLimit,
    roomImage: roomData.roomImage,
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/booking", {
        ...input,
      });

      if (res) {
        navigate("/reservation/1");
      }
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <h1>Booking Page</h1>
        {roomData ? (
          <div>
            <h2>Selected Room Details</h2>
            <p>Room Type: {roomData.roomType}</p>
            <p>Room Price: {roomData.roomPrice}</p>
            <p>Start Date: {reservationData.startDate}</p>
            <p>End Date: {reservationData.endDate}</p>
            <p>Guest: {reservationData.guestLimit}</p>
            <img src={roomData.roomImage} alt="Rooms" />
            <Button>Booking Room</Button>
          </div>
        ) : (
          <p>No room data available for booking.</p>
        )}
      </form>
    </div>
  );
}

export default BookingPage;
