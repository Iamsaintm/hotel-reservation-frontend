import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function RoomEditForm({
  setShowEditForm,
  updateRoom,
  roomSelect,
  room,
}) {
  const [input, setInput] = useState({
    roomId: roomSelect.id,
    roomNumber: roomSelect.roomNumber,
    isMaintenance: roomSelect.isMaintenance.toString(),
    roomType: roomSelect.roomType.roomType,
    roomTypeId: roomSelect.roomTypeId.toString(),
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
      <h2>Room Edit Form</h2>
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
          {Array.from(uniqueRoomTypes).map((roomType) => (
            <option key={roomType} value={roomType}>
              {roomType}
            </option>
          ))}
        </select>
      </div>
      <Button
        onClick={() => {
          return updateRoom({
            ...input,
            isMaintenance: input.isMaintenance === "true" ? true : false,
            roomTypeId: +input.roomTypeId,
          });
        }}
      >
        Update Room
      </Button>

      <Button onClick={() => setShowEditForm(false)}>Cancel</Button>
    </div>
  );
}
