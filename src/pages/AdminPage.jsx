import { useState } from "react";
import Button from "../components/Button";
import RoomAdmin from "../features/room/RoomAdmin";
import RoomTypeAdmin from "../features/room/RoomTypeAdmin";
import BookingAdmin from "../features/booking/BookingsAdmin";

export default function AdminPage() {
  const [isOpen, setIsOpen] = useState("rooms");

  return (
    <div className="relative">
      <div className="absolute top-7 left-60">
        <Button
          className={`mx-2 ${isOpen === "rooms" ? "bg-orange-600" : ""}`}
          onClick={() => setIsOpen("rooms")}
        >
          Rooms
        </Button>
        <Button
          className={`mx-2 ${isOpen === "roomType" ? "bg-orange-600" : ""}`}
          onClick={() => setIsOpen("roomType")}
        >
          Room Type
        </Button>
        <Button
          className={`mx-2 ${isOpen === "booking" ? "bg-orange-600" : ""}`}
          onClick={() => setIsOpen("booking")}
        >
          Booking
        </Button>
      </div>

      {isOpen === "rooms" && <RoomAdmin setIsOpen={setIsOpen} />}
      {isOpen === "roomType" && <RoomTypeAdmin setIsOpen={setIsOpen} />}
      {isOpen === "booking" && <BookingAdmin setIsOpen={setIsOpen} />}
    </div>
  );
}
