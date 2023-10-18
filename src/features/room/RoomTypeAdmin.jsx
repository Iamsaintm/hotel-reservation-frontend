import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useSearch } from "../../hooks/use-search";

export default function RoomTypeAdmin({ deleteRoomType }) {
  const { searchAllRoomType } = useSearch();
  const [roomTypes, setRoomTypes] = useState([]);

  const fetchRoomTypeData = async () => {
    try {
      const roomTypeData = await searchAllRoomType();
      setRoomTypes(roomTypeData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchRoomTypeData();
  }, []);

  const handleDelete = async (roomTypeId) => {
    try {
      await deleteRoomType(roomTypeId);
      fetchRoomTypeData();
    } catch (error) {
      console.error("Error deleting room type: ", error);
    }
  };

  return (
    <div>
      {roomTypes.map((roomType) => (
        <div key={roomType.id}>
          <p>ID: {roomType.id}</p>
          <p>Room Type: {roomType.roomType}</p>
          <p>Room Price: {roomType.roomPrice}</p>
          <p>Guest Limit: {roomType.guestLimit}</p>
          <Button>Edit</Button>
          <Button onClick={() => handleDelete(roomType.id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
}
