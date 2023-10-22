import { useState } from "react";
import Button from "../../components/Button";

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
    <div className="px-2 py-1 flex flex-col gap-2">
      <h1 className="text-xl">Room Edit Form</h1>
      <div className="flex flex-col gap-1">
        <p>Room Number</p>
        <input
          placeholder="Room number"
          className={`h-10 block w-50 text-black rounded-md px-4 py-3 outline-none border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500`}
          value={input.roomNumber}
          onChange={(e) => setInput({ ...input, roomNumber: e.target.value })}
        />
      </div>
      <div className="flex gap-10 justify-between">
        <label htmlFor="isMaintenance">Maintenance</label>
        <select
          id="isMaintenance"
          className="border border-black"
          value={input.isMaintenance}
          onChange={(e) =>
            setInput({ ...input, isMaintenance: e.target.value === "true" })
          }
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
      </div>
      <div className="flex gap-10 justify-between">
        <label htmlFor="roomType">Room Type</label>
        <select
          id="roomType"
          className="border border-black"
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
      <div className="flex justify-around pt-2">
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
        <Button className="bg-red-500" onClick={() => setShowEditForm(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
