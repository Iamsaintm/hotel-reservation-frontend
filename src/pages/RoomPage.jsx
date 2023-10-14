import { useLocation } from "react-router-dom";

function RoomPage() {
  const location = useLocation();
  const [rooms, roomTypes] = location.state.roomData;

  const roomData = location.state.roomData;
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

  return (
    <div>
      <h1>Room Page</h1>
      {Object.keys(roomTypeCounts).map((roomType, index) => (
        <div key={index}>
          <p>{roomType}</p>
          <p>Count: {roomTypeCounts[roomType]}</p>
        </div>
      ))}
    </div>
  );
}

export default RoomPage;
