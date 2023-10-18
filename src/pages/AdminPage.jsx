import { useState } from "react";
import Button from "../components/Button";
import RoomAdmin from "../features/room/RoomAdmin";
import RoomTypeAdmin from "../features/room/RoomTypeAdmin";
import BookingAdmin from "../features/booking/BookingsAdmin";
import axios from "../config/axios";

export default function AdminPage() {
  const [isOpen, setIsOpen] = useState(null);
  const [allRoom, setAllRoom] = useState([]);

  const createRoom = async (data) => {
    const res = await axios.room("/room", data);
    const newRoom = res.data.room;
    setAllRoom([newRoom, ...allRoom]);
  };

  const deleteRoom = async (roomId) => {
    try {
      await axios.delete(`/admin/room/${roomId}`);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRoomType = async (roomTypeId) => {
    try {
      await axios.delete(`/admin/room/${roomTypeId}/roomType`);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      await axios.delete(`/admin/booking/${bookingId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <Button onClick={() => setIsOpen("rooms")}>Rooms</Button>
        <Button onClick={() => setIsOpen("roomType")}>Room Type</Button>
        <Button onClick={() => setIsOpen("booking")}>Booking</Button>
      </div>

      {isOpen === "rooms" && <RoomAdmin deleteRoom={deleteRoom} />}
      {isOpen === "roomType" && (
        <RoomTypeAdmin deleteRoomType={deleteRoomType} />
      )}
      {isOpen === "booking" && <BookingAdmin deleteBooking={deleteBooking} />}
    </div>
  );
}
