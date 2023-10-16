import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";

function RoomPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [rooms, roomTypes] = location.state.roomData;
  const { roomData, reservationData } = location.state;
  if (!roomData) {
    return (
      <div>
        <h1>Room Page</h1>
        <p>No room data available.</p>
      </div>
    );
  }

  const roomTypesMap = roomTypes.reduce((acc, roomType) => {
    acc[roomType.id] = roomType;
    return acc;
  }, {});

  const roomTypeCounts = rooms.reduce((acc, room) => {
    const roomType = roomTypesMap[room.roomTypeId];
    if (roomType) {
      const { roomType: type, roomPrice, guestLimit } = roomType;
      const key = `${type} - Price: ${roomPrice}, Guests Limit: ${guestLimit}`;
      acc[key] = (acc[key] || 0) + 1;
    }
    return acc;
  }, {});

  const handleButtonClick = (selectedRoomType) => {
    const selectedRoom = rooms.find((room) => {
      const roomType = roomTypesMap[room.roomTypeId];
      return (
        roomType &&
        `${roomType.roomType} - Price: ${roomType.roomPrice}, Guests Limit: ${roomType.guestLimit}` ===
          selectedRoomType
      );
    });

    if (selectedRoom) {
      selectedRoom.roomType = roomTypesMap[selectedRoom.roomTypeId].roomType;
      selectedRoom.roomPrice = roomTypesMap[selectedRoom.roomTypeId].roomPrice;
      selectedRoom.guestLimit =
        roomTypesMap[selectedRoom.roomTypeId].guestLimit;
      navigate("/booking", {
        state: { roomData: selectedRoom, reservationData },
      });
    }
  };

  return (
    <div>
      <h1>Room Page</h1>
      {Object.keys(roomTypeCounts).map((roomType, index) => {
        if (roomTypeCounts[roomType] > 0) {
          return (
            <div key={index}>
              <p>{roomType}</p>
              <p>Count: {roomTypeCounts[roomType]}</p>
              <Button onClick={() => handleButtonClick(roomType)}>
                Click it
              </Button>
            </div>
          );
        }
        return null;
      })}
      {Object.keys(roomTypeCounts).every(
        (roomType) => roomTypeCounts[roomType] === 0
      ) && <p>No room for {reservationData.guestLimit} people.</p>}
    </div>
  );
}

export default RoomPage;
