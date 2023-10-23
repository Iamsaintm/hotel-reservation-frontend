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
    <div className="py-20">
      <form onSubmit={handleSubmitForm}>
        {roomData ? (
          <div className="flex flex-col gap-3 p-4">
            <div className="mx-auto">
              <div className="relative flex h-72 w-[1000px] items-start gap-4 overflow-hidden rounded-lg shadow-lg ">
                <div className="flex-1">
                  <img src={roomData.roomType.roomImage} alt="Rooms" />
                </div>
                <div className="flex-1 py-1">
                  <div className="flex flex-col gap-3 p-4">
                    <h1 className="text-xl">Booking Details</h1>
                    <p className="text-base">
                      Room Type: {roomData.roomType.roomType}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <p className="text-base">Room Price: {totalPrice}</p>
                      <p className="text-base">
                        Guest: {reservationData.guestLimit}
                      </p>

                      <p className="text-base">
                        Check-in Date: {reservationData.startDate}
                      </p>
                      <p className="text-base">
                        Check-out Date: {reservationData.endDate}
                      </p>
                    </div>
                    <div className="flex justify-end py-16">
                      <Button>Booking Room</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No room data available for booking.</p>
        )}
      </form>
    </div>
  );
}

export default BookingPage;
