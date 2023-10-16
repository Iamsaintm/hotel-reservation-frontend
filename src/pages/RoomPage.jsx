import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";

export default function RoomPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [rooms, roomTypes] = location.state.roomData;
  const reservationData = location.state.reservationData;

  if (!roomTypes || !rooms) {
    return (
      <div>
        <h1>Room Page</h1>
        <p>No room data available.</p>
      </div>
    );
  }

  const roomTypeCounts = rooms.reduce((acc, room) => {
    const roomType = roomTypes[room.roomTypeId];
    if (roomType) {
      const { roomType: type, roomPrice, roomImage } = roomType;
      const key = `${type}`;
      acc[key] = {
        count: (acc[key] ? acc[key].count : 0) + 1,
        roomPrice,
        roomImage,
      };
    }
    return acc;
  }, {});

  const handleButtonClick = (selectedRoomType) => {
    const selectedRoom = rooms.find((room) => {
      const roomType = roomTypes[room.roomTypeId];
      return roomType && roomType.roomType === selectedRoomType;
    });

    if (selectedRoom) {
      navigate("/booking", {
        state: { roomData: selectedRoom, reservationData },
      });
    }
  };

  return (
    <div>
      <h1>Room Page</h1>
      {Object.keys(roomTypeCounts).map((roomType, index) => {
        if (roomTypeCounts[roomType].count > 0) {
          const roomInfo = roomTypeCounts[roomType];
          return (
            <div key={index}>
              <p>Room Type: {roomType}</p>
              <p>Room Price: {roomInfo.roomPrice}</p>
              <img src={roomInfo.roomImage} alt={roomType} />
              <p>Count: {roomInfo.count}</p>
              <Button onClick={() => handleButtonClick(roomType)}>
                Click it
              </Button>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
