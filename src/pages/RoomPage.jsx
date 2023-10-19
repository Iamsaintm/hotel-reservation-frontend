import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../hooks/use-auth";
import SearchRoom from "../features/search/SearchRoom";

export default function RoomPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { roomData, reservationData } = location.state || {};
  const { setShowLoginForm, authUser } = useAuth();

  if (!roomData || roomData.length === 0) {
    return (
      <div>
        <h1>Room Page</h1>
        <p>No room data available.</p>
      </div>
    );
  }

  const roomTypeCounts = roomData.reduce((acc, room) => {
    const roomType = room.roomType;
    if (roomType) {
      const { roomType: type, roomPrice, roomImage } = roomType;
      const key = `${type}`;
      if (!acc[key]) {
        acc[key] = {
          count: 1,
          roomPrice,
          roomImage,
        };
      } else {
        acc[key].count += 1;
      }
    }
    return acc;
  }, {});

  const handleButtonClick = (selectedRoomType) => {
    if (!authUser) {
      return setShowLoginForm(true);
    }

    const selectedRoom = roomData.find((room) => {
      const roomType = room.roomType;

      return roomType && roomType.roomType === selectedRoomType;
    });

    if (selectedRoom) {
      navigate("/booking", {
        state: { roomData: selectedRoom, reservationData },
      });
    } else {
      console.log("No matching room found");
    }
  };

  return (
    <div>
      <SearchRoom
        startDate={reservationData.startDate}
        endDate={reservationData.endDate}
        guestLimit={reservationData.guestLimit}
      />
      {Object.keys(roomTypeCounts).map((roomType, index) => {
        const roomTypeCount = roomTypeCounts[roomType];
        return (
          <div key={index} className="flex w-1/2 m-auto">
            <img src={roomTypeCount.roomImage} alt={roomType} />
            <p> {roomType}</p>
            <p>Room Price: {roomTypeCount.roomPrice}</p>
            <p>Count: {roomTypeCount.count}</p>

            <Button onClick={() => handleButtonClick(roomType)}>
              Click it
            </Button>
          </div>
        );
      })}
    </div>
  );
}
