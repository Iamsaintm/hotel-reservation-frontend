import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useSearch } from "../../hooks/use-search";
import axios from "../../config/axios";
import RoomTypeEditForm from "./RoomTypeEditForm";
import { toast } from "react-toastify";
import RoomTypeCreateForm from "./RoomTypeCreateForm";

export default function RoomTypeAdmin() {
  const { searchAllRoomType } = useSearch();
  const [roomTypes, setRoomTypes] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const createRoomType = async (data) => {
    try {
      const formData = new FormData();
      formData.append("roomImage", data.roomImage);
      formData.append("roomType", data.roomType);
      formData.append("guestLimit", data.guestLimit);
      formData.append("roomPrice", data.roomPrice);
      const res = await axios.post("/admin/room/roomType", formData);
      const newRoomType = res.data.roomType;
      setRoomTypes([newRoomType, ...roomTypes]);

      toast.success("Room type created successfully");
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating room type: ", error);
      toast.error("Error creating room type");
    }
  };

  const updateRoomType = async (data) => {
    try {
      const formData = new FormData();
      formData.append("roomImage", data.roomImage);
      formData.append("roomType", data.roomType);
      formData.append("guestLimit", data.guestLimit);
      formData.append("roomPrice", data.roomPrice);

      const res = await axios.patch(
        `/admin/room/${data.roomTypeId}/roomType`,
        formData
      );
      setRoomTypes((prev) => {
        const updatedRoomTypes = prev.filter(
          (roomType) => roomType.id !== res.data.roomType.id
        );
        const sortRoomType = [...updatedRoomTypes, res.data.roomType];
        return sortRoomType.sort((a, b) => a.id - b.id);
      });

      toast.success("Room type update successfully");
      setShowEditForm(false);
    } catch (error) {
      console.error("Error update room: ", error);
      toast.error("Error update room");
    }
  };

  const deleteRoomType = async (roomTypeId) => {
    try {
      await axios.delete(`/admin/room/${roomTypeId}/roomType`);
      toast.success("Room created successfully");
    } catch (error) {
      console.error("Error creating room: ", error);
      toast.error("Error creating room");
    }
  };

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
      <Button
        onClick={() => {
          setShowCreateForm(true);
        }}
      >
        Add Room
      </Button>
      {roomTypes.map((roomType) => (
        <div key={roomType.id}>
          <p>ID: {roomType.id}</p>
          <p>Room Type: {roomType.roomType}</p>
          <p>Room Price: {roomType.roomPrice}</p>
          <p>Guest Limit: {roomType.guestLimit}</p>
          <img src={roomType.roomImage} alt="room" />
          <Button
            onClick={() => {
              setShowEditForm(roomType);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(roomType.id)}>Delete</Button>
        </div>
      ))}
      {showCreateForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 shadow-lg">
            <RoomTypeCreateForm
              setShowCreateForm={setShowCreateForm}
              createRoomType={createRoomType}
            />
          </div>
        </div>
      )}
      {showEditForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 shadow-lg">
            <RoomTypeEditForm
              setShowEditForm={setShowEditForm}
              updateRoomType={updateRoomType}
              roomSelect={showEditForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}
