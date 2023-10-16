import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import { useSearch } from "../../hooks/use-search";
import { useNavigate } from "react-router-dom";

export default function SearchRoom() {
  const [input, setInput] = useState({
    startDate: "",
    endDate: "",
    guestLimit: "",
  });

  const { searchVacantRoom } = useSearch();

  const navigate = useNavigate();
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await searchVacantRoom(input);

      if (res) {
        navigate("/room", { state: { roomData: res, reservationData: input } });
      }
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  return (
    <form
      className="flex gap-4 items-center justify-center"
      onSubmit={handleSubmitForm}
    >
      <Input
        text={"Start Date"}
        type="date"
        value={input.startDate}
        onChange={(e) => {
          return setInput({ ...input, startDate: e.target.value });
        }}
      />
      <Input
        text={"End Date"}
        type="date"
        value={input.endDate}
        onChange={(e) => {
          return setInput({ ...input, endDate: e.target.value });
        }}
      />
      <Input
        text={"Guests"}
        type="text"
        value={input.guestLimit}
        onChange={(e) => {
          return setInput({ ...input, guestLimit: e.target.value });
        }}
      />
      <Button type="submit" className={"h-10 flex "}>
        Click me
      </Button>
    </form>
  );
}
