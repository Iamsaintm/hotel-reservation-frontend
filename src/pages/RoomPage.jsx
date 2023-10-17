import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../hooks/use-auth";
import SearchRoom from "../features/search/SearchRoom";

export default function RoomPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [rooms, roomTypes] = location.state.roomData;
  const reservationData = location.state.reservationData;
  const { setShowLoginForm, authUser } = useAuth();
  // console.log(rooms);
  // console.log(roomTypes);
  if (!roomTypes || !rooms) {
    return (
      <div>
        <h1>Room Page</h1>
        <p>No room data available.</p>
      </div>
    );
  }
  const roomsWithRoomType = rooms.map((room) => {
    const roomType = roomTypes.find((rt) => rt.id === room.roomTypeId);
    if (roomType) {
      return { ...room, roomType };
    }
    return room;
  });

  const roomTypeCounts = roomsWithRoomType.reduce((acc, room) => {
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

    const selectedRoom = roomTypes.find((roomTypes) => {
      const roomType = roomTypes.roomType;

      return roomType && roomType === selectedRoomType;
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
      <SearchRoom
        startDate={reservationData.startDate}
        endDate={reservationData.endDate}
        guestLimit={reservationData.guestLimit}
      />
      {Object.keys(roomTypeCounts).map((roomType, index) => {
        const roomTypeCount = roomTypeCounts[roomType];
        return (
          <div key={index}>
            <p>Room Type: {roomType}</p>
            <p>Room Price: {roomTypeCount.roomPrice}</p>
            <p>Count: {roomTypeCount.count}</p>
            <img src={roomTypeCount.roomImage} alt={roomType} />
            <Button onClick={() => handleButtonClick(roomType)}>
              Click it
            </Button>
          </div>
        );
      })}
    </div>
  );
}
