import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import { useSearch } from "../../hooks/use-search";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

export default function SearchRoom({ startDate, endDate, guestLimit }) {
  const [input, setInput] = useState({
    startDate: startDate || "",
    endDate: endDate || "",
    guestLimit: guestLimit || "",
  });

  const searchSchema = Joi.object({
    startDate: Joi.date()
      .greater(Date.now() - 24 * 60 * 60 * 1000)
      .required(),
    endDate: Joi.date().greater(Date.now()).required(),
    guestLimit: Joi.string()
      .pattern(/^[1-6]{1}$/)
      .required(),
  });

  const validateSearch = (input) => {
    const { error } = searchSchema.validate(input, { abortEarly: false });
    if (error) {
      const result = error.details.reduce((acc, el) => {
        const { message, path } = el;
        acc[path[0]] = message;
        return acc;
      }, {});
      return result;
    }
  };
  const { searchVacantRoom } = useSearch();

  const navigate = useNavigate();
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const validationError = validateSearch(input);
      if (validationError) {
        toast.error(
          "Do not select a date before now. or guest limit is 6 people"
        );
        return;
      }
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
      className="flex gap-4 items-center justify-center z-20"
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
      <Button className={"h-10 flex "}>Click me</Button>
    </form>
  );
}
