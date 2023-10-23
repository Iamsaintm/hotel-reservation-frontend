import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useSearch } from "../../hooks/use-search";
import axios from "../../config/axios";
import RoomEditForm from "./RoomEditForm";
import { toast } from "react-toastify";
import RoomCreateForm from "./RoomCreateForm";
import { DeleteIcon, EditIcon } from "../../icon";

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

      toast.success("Room updated successfully");
      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating room: ", error);
      toast.error("Error updating room");
    }
  };

  const deleteRoom = async (roomId) => {
    try {
      await axios.delete(`/admin/room/${roomId}`);
      toast.success("Room deleted successfully");
    } catch (error) {
      console.error("Error deleting room: ", error);
      toast.error("Error deleting room");
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
    <div className="py-4 w-3/4 m-auto">
      <div className="flex justify-end py-3 px-2">
        <Button
          onClick={() => {
            setShowCreateForm(true);
          }}
        >
          Add Room
        </Button>
      </div>
      <h1 className="text-xl py-2">Rooms details</h1>
      <table className="table-auto w-full text-center border border-solid bg-blue-600">
        <thead>
          <tr className="text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Room Number</th>
            <th className="px-4 py-2">Room Type</th>
            <th className="px-4 py-2">Room Price</th>
            <th className="px-4 py-2">Guest</th>
            <th className="px-4 py-2">Maintenance</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {room.map((room) => (
            <tr key={room.id} className="border border-solid bg-gray-200">
              <td className="px-4 py-2">{room.id}</td>
              <td className="px-4 py-2">{room.roomNumber}</td>
              <td className="px-4 py-2">{room.roomType?.roomType}</td>
              <td className="px-4 py-2">{room.roomType?.roomPrice}</td>
              <td className="px-4 py-2">{room.roomType?.guestLimit}</td>
              <td className="px-4 py-2">{room.isMaintenance ? "Yes" : "No"}</td>
              <td className="px-4 py-2 flex gap-8 justify-center">
                <Button
                  onClick={() => {
                    setShowEditForm(room);
                  }}
                >
                  <EditIcon />
                </Button>
                <Button onClick={() => handleDelete(room.id)}>
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showCreateForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div className="bg-white p-4 shadow-lg rounded-md w-1/3">
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
          <div className="bg-white p-4 shadow-lg rounded-md w-1/3">
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
