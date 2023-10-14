import axios from "../config/axios";
import { useState } from "react";

export function useSearch() {
  const [vacantRoom, setVacantRoom] = useState(null);
  const searchVacantRoom = async (room) => {
    try {
      const res = await axios.get("/user/room", { params: room });
      setVacantRoom(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return { searchVacantRoom, vacantRoom };
}
