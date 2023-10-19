import { useState } from "react";
import Button from "../components/Button";
import RoomAdmin from "../features/room/RoomAdmin";
import RoomTypeAdmin from "../features/room/RoomTypeAdmin";
import BookingAdmin from "../features/booking/BookingsAdmin";

export default function AdminPage() {
  const [isOpen, setIsOpen] = useState(null);

  return (
    <div>
      <div>
        <Button onClick={() => setIsOpen("rooms")}>Rooms</Button>
        <Button onClick={() => setIsOpen("roomType")}>Room Type</Button>
        <Button onClick={() => setIsOpen("booking")}>Booking</Button>
      </div>

      {isOpen === "rooms" && <RoomAdmin setIsOpen={setIsOpen} />}
      {isOpen === "roomType" && <RoomTypeAdmin setIsOpen={setIsOpen} />}
      {isOpen === "booking" && <BookingAdmin setIsOpen={setIsOpen} />}
    </div>
  );
}
