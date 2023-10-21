import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useSearch } from "../../hooks/use-search";
import axios from "../../config/axios";
import RoomEditForm from "./RoomEditForm";
import { toast } from "react-toastify";
import RoomCreateForm from "./RoomCreateForm";

export default function RoomAdmin() {
  const { searchAllRoom } = useSearch();
  const [room, setRoom] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const createRoom = async (data) => {
    try {
      await axios.post("/admin/room", data);
      toast.success("Room created successfully");
      fetchRoomData();

      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating room: ", error);
      toast.error("Error creating room");
    }
  };

  const updateRoom = async (data) => {
    try {
      await axios.patch(`/admin/room/${data.roomId}`, data);

      const updatedRoomData = await searchAllRoom();
      setRoom(updatedRoomData);
      fetchRoomData();

      toast.success("Room update successfully");
      setShowEditForm(false);
    } catch (error) {
      console.error("Error update room: ", error);
      toast.error("Error update room");
    }
  };

  const deleteRoom = async (roomId) => {
    try {
      await axios.delete(`/admin/room/${roomId}`);
      toast.success("Room delete successfully");
    } catch (error) {
      console.error("Error delete room: ", error);
      toast.error("Error delete room");
    }
  };

  const fetchRoomData = async () => {
    try {
      const roomData = await searchAllRoom();
      setRoom(roomData);
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
    <div className="room-admin-container">
      <Button
        onClick={() => {
          setShowCreateForm(true);
        }}
      >
        Add Room
      </Button>
      {room.map((room) => (
        <div key={room.id}>
          <p>ID: {room.id}</p>
          <p>Is Maintenance: {room.isMaintenance ? "Yes" : "No"}</p>
          <p>Room Number: {room.roomNumber}</p>
          <p>Room Type ID: {room.roomTypeId}</p>
          <p>Room Type: {room.roomType?.roomType}</p>
          <p>Room Price: {room.roomType?.roomPrice}</p>
          <p>Guest: {room.roomType?.guestLimit}</p>
          <Button
            onClick={() => {
              setShowEditForm(room);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(room.id)}>Delete</Button>
        </div>
      ))}
      {showCreateForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 shadow-lg">
            <RoomCreateForm
              setShowCreateForm={setShowCreateForm}
              createRoom={createRoom}
              room={room}
            />
          </div>
        </div>
      )}
      {showEditForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 shadow-lg">
            <RoomEditForm
              setShowEditForm={setShowEditForm}
              updateRoom={updateRoom}
              room={room}
              roomSelect={showEditForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}
