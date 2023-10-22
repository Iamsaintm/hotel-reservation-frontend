import { useState } from "react";
import Button from "../../components/Button";

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

  const roomTypes = [];

  room.forEach((roomItem) => {
    const roomType = roomItem.roomType.roomType;
    if (!roomTypes.includes(roomType)) {
      roomTypes.push(roomType);
    }
  });

  const roomTypeId = {};

  room.forEach((roomItem) => {
    roomTypeId[roomItem.roomType.roomType] = roomItem.roomTypeId;
  });

  return (
    <div className="px-2 py-1 flex flex-col gap-2">
      <h1 className="text-xl">Room Create Form</h1>
      <div className="flex flex-col gap-1">
        <p>Room Number</p>
        <input
          placeholder="Room number"
          className={`h-10 block w-50 text-black rounded-md px-4 py-3 outline-none border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500`}
          value={input.roomNumber}
          onChange={(e) => setInput({ ...input, roomNumber: e.target.value })}
        />
      </div>
      <div className="flex gap-8 justify-between">
        <label htmlFor="isMaintenance">Maintenance</label>
        <select
          id="isMaintenance"
          className="border border-black"
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
              roomTypeId: roomTypeId[e.target.value],
            })
          }
        >
          <option value="">Select a room type</option>
          {roomTypes.map((roomType) => (
            <option key={roomType} value={roomType}>
              {roomType}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-around pt-2">
        <Button
          onClick={() => {
            return createRoom(input);
          }}
        >
          Create Room
        </Button>
        <Button className="bg-red-500" onClick={() => setShowCreateForm(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
