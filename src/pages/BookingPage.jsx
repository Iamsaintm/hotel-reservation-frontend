import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { toast } from "react-toastify";
import axios from "../config/axios";
import { useAuth } from "../hooks/use-auth";

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomData, reservationData } = location.state;

  const { authUser } = useAuth();

  const input = {
    startDate: reservationData.startDate,
    endDate: reservationData.endDate,
    userId: authUser.id,
    roomId: roomData.id,
    guest: reservationData.guestLimit,
    roomImage: roomData.roomImage,
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/booking", {
        ...input,
      });

      if (res) {
        navigate(`/reservation/{userId}`);
      }
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  const startDate = new Date(input.startDate);
  const endDate = new Date(input.endDate);

  const timeDifference = endDate - startDate;

  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  const totalPrice = daysDifference * roomData.roomType.roomPrice;

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <h1>Booking Page</h1>
        {roomData ? (
          <div>
            <h2>Selected Room Details</h2>

            <p>Room Type: {roomData.roomType.roomType}</p>
            <p>Room Price: {totalPrice}</p>
            <p>Start Date: {reservationData.startDate}</p>
            <p>End Date: {reservationData.endDate}</p>
            <p>Guest: {reservationData.guestLimit}</p>
            <img src={roomData.roomType.roomImage} alt="Rooms" />
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
