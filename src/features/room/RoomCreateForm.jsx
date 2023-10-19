import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function RoomCreateForm({
  setShowCreateForm,
  createRoom,
  room,
}) {
  const [input, setInput] = useState({
    roomNumber: "",
    isMaintenance: "",
    roomType: "",
    roomTypeId: "",
  });

  const uniqueRoomTypes = new Set();

  room.forEach((roomItem) => {
    uniqueRoomTypes.add(roomItem.roomType.roomType);
  });

  const roomTypeToIdMapping = {};

  room.forEach((roomItem) => {
    roomTypeToIdMapping[roomItem.roomType.roomType] = roomItem.roomTypeId;
  });
  return (
    <div>
      <h2>Room Create Form</h2>
      <Input
        text="Room Number"
        type="text"
        value={input.roomNumber}
        onChange={(e) => setInput({ ...input, roomNumber: e.target.value })}
      />
      <div>
        <label htmlFor="isMaintenance">Maintenance</label>
        <select
          id="isMaintenance"
          value={input.isMaintenance}
          onChange={(e) =>
            setInput({ ...input, isMaintenance: e.target.value === "true" })
          }
        >
          <option value="">Select maintenance status</option>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
      </div>
      <div>
        <label htmlFor="roomType">Room Type</label>
        <select
          id="roomType"
          value={input.roomType}
          onChange={(e) =>
            setInput({
              ...input,
              roomType: e.target.value,
              roomTypeId: roomTypeToIdMapping[e.target.value],
            })
          }
        >
          <option value="">Select a room type</option>
          {Array.from(uniqueRoomTypes).map((roomType) => (
            <option key={roomType} value={roomType}>
              {roomType}
            </option>
          ))}
        </select>
      </div>
      <Button
        onClick={() => {
          return createRoom(input);
        }}
      >
        Create Room
      </Button>
      <Button onClick={() => setShowCreateForm(false)}>Cancel</Button>
    </div>
  );
}
