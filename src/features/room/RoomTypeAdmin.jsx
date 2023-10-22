import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useSearch } from "../../hooks/use-search";
import axios from "../../config/axios";
import RoomTypeEditForm from "./RoomTypeEditForm";
import { toast } from "react-toastify";
import RoomTypeCreateForm from "./RoomTypeCreateForm";
import { DeleteIcon, EditIcon } from "../../icon";

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

      await axios.patch(`/admin/room/${data.roomTypeId}/roomType`, formData);

      fetchRoomTypeData();

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
      <h1 className="text-xl py-1">Room type details</h1>
      <div className="grid grid-cols-2 gap-2 ">
        {roomTypes.map((roomType) => (
          <div key={roomType.id} className="flex flex-col m-8">
            <div className="mx-auto">
              <div className="relative flex h-56 w-[600px] max-w-3xl items-start gap-4 overflow-hidden rounded-lg shadow-lg ">
                <div className="flex-1">
                  <img
                    src={roomType.roomImage}
                    alt="room"
                    className="h-[250px] w-[300px] object-cover transition-all duration--300 group-hover:opacity-90"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col gap-4 p-4">
                    <p className="text-base">ID: {roomType.id}</p>
                    <p className="text-base">Room Type: {roomType.roomType}</p>
                    <p className="text-base">
                      Room Price: {roomType.roomPrice}
                    </p>
                    <p className="text-base">
                      Guest Limit: {roomType.guestLimit}
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button
                        onClick={() => {
                          setShowEditForm(roomType);
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <Button onClick={() => handleDelete(roomType.id)}>
                        <DeleteIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 shadow-lg rounded-md w-2/5">
            <RoomTypeCreateForm
              setShowCreateForm={setShowCreateForm}
              createRoomType={createRoomType}
            />
          </div>
        </div>
      )}
      {showEditForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 shadow-lg rounded-md w-2/5">
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
