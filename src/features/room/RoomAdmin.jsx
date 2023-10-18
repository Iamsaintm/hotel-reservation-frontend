import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useSearch } from "../../hooks/use-search";

export default function RoomAdmin({ deleteRoom }) {
  const { searchAllRoom, searchAllRoomType } = useSearch();
  const [room, setRoom] = useState([]);

  const fetchRoomData = async () => {
    try {
      const roomData = await searchAllRoom();
      const roomTypeData = await searchAllRoomType();

      const roomTypesMap = {};
      roomTypeData.forEach((rt) => {
        roomTypesMap[rt.id] = rt;
      });

      const roomsWithRoomTypes = roomData.map((room) => ({
        ...room,
        roomType: roomTypesMap[room.roomTypeId],
      }));

      setRoom(roomsWithRoomTypes);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchRoomData();
  }, []);

  const handleDelete = async (roomId) => {
    try {
      await deleteRoom(roomId);

      fetchRoomData();
    } catch (error) {
      console.error("Error deleting room: ", error);
    }
  };

  return (
    <div>
      {room.map((room) => (
        <div key={room.id}>
          <p>ID: {room.id}</p>
          <p>Is Maintenance: {room.isMaintenance ? "Yes" : "No"}</p>
          <p>Room Number: {room.roomNumber}</p>
          <p>Room Type ID: {room.roomTypeId}</p>

          <p>Room Type: {room.roomType.roomType}</p>
          <p>Room Price: {room.roomType.roomPrice}</p>
          <p>Guest: {room.roomType.guestLimit}</p>
          <Button>Edit</Button>
          <Button onClick={() => handleDelete(room.id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
}
