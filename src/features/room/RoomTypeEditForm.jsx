import { useRef, useState } from "react";
import Button from "../../components/Button";

export default function RoomTypeEditForm({
  setShowEditForm,
  updateRoomType,
  roomSelect,
}) {
  const [input, setInput] = useState({
    roomTypeId: roomSelect.id,
    roomType: roomSelect.roomType,
    roomPrice: roomSelect.roomPrice,
    guestLimit: roomSelect.guestLimit,
    roomImage: roomSelect.roomImage,
  });
  const fileEl = useRef(null);
  const [file, setFile] = useState(input.roomImage);
  return (
    <div className="px-2 py-1 flex flex-col gap-2 w-full">
      <h2>Room type update form</h2>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <p>Room Type</p>
          <input
            placeholder="Room Type"
            className={`h-10 block w-full text-black rounded-md px-4 py-3 outline-none border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500`}
            value={input.roomType}
            onChange={(e) => setInput({ ...input, roomType: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Guest Limit</p>
          <input
            placeholder="Guest Limit"
            className={`h-10 block w-full text-black rounded-md px-4 py-3 outline-none border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500`}
            value={input.guestLimit}
            onChange={(e) => setInput({ ...input, guestLimit: e.target.value })}
          />
        </div>

        {file ? (
          <div
            onClick={() => fileEl.current.click()}
            className="cursor-pointer max-h-56 overflow-hidden flex"
          >
            <img
              src={file}
              alt="roomType"
              className="h-[250px] w-full object-cover transition-all duration--300 group-hover:opacity-90"
            />
          </div>
        ) : (
          <div
            className="h-56 bg-gray-200 hover:bg-gray-300 rounded-lg py-12 flex flex-col items-center cursor-pointer gap-2 justify-center"
            onClick={() => fileEl.current.click()}
          >
            <div className="bg-gray-400 h-10 w-10 rounded-full flex items-center justify-center">
              +
            </div>
            <span>Add photo</span>
          </div>
        )}
        <input
          type="file"
          className="hidden"
          ref={fileEl}
          onChange={(e) => {
            if (e.target.files[0]) {
              setFile(URL.createObjectURL(e.target.files[0]));
              setInput({ ...input, roomImage: e.target.files[0] });
            }
          }}
        />

        <div className="flex flex-col gap-1">
          <p>Room Price</p>
          <input
            placeholder="Room Price"
            className={`h-10 block w-full text-black rounded-md px-4 py-3 outline-none border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500`}
            value={input.roomPrice}
            onChange={(e) => setInput({ ...input, roomPrice: e.target.value })}
          />
        </div>
        <div className="flex justify-around pt-2">
          <Button
            onClick={() => {
              return updateRoomType(input);
            }}
          >
            Update room type
          </Button>
          <Button className="bg-red-500" onClick={() => setShowEditForm(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
