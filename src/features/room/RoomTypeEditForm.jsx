import { useRef, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";

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
    <div>
      <h2>RoomTypeCreateForm</h2>
      <Input
        text="Room Type"
        type="text"
        value={input.roomType}
        onChange={(e) => setInput({ ...input, roomType: e.target.value })}
      />
      <Input
        text="Guest Limit"
        type="text"
        value={input.guestLimit}
        onChange={(e) => setInput({ ...input, guestLimit: e.target.value })}
      />
      {file ? (
        <div
          onClick={() => fileEl.current.click()}
          className="cursor-pointer max-h-52 overflow-hidden"
        >
          <img src={file} alt="post" />
        </div>
      ) : (
        <div
          className="bg-gray-200 hover:bg-gray-300 rounded-lg py-12 flex flex-col items-center cursor-pointer gap-2"
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
      <Input
        text="Room Price"
        type="text"
        value={input.roomPrice}
        onChange={(e) => setInput({ ...input, roomPrice: e.target.value })}
      />
      <Button
        onClick={() => {
          return updateRoomType(input);
        }}
      >
        Update Room Type
      </Button>
      <Button onClick={() => setShowEditForm(false)}>Cancel</Button>
    </div>
  );
}
