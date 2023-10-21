import { createContext, useCallback, useState } from "react";
import axios from "../config/axios";

export const SearchContext = createContext();

export default function SearchContextProvider({ children }) {
  const [vacantRoom, setVacantRoom] = useState(null);
  const [bookingRoom, setBookingRoom] = useState(null);

  const searchVacantRoom = async (room) => {
    const res = await axios.get("/user/room", { params: room });
    setVacantRoom(res.data);
    return res.data;
  };

  const searchBooking = useCallback(async () => {
    try {
      const res = await axios.get("/user/booking");
      setBookingRoom(res.data);
      return res.data;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, []);

  const searchAllRoom = async () => {
    const res = await axios.get("/admin/room");
    setVacantRoom(res.data);
    return res.data;
  };

  const searchAllRoomType = async () => {
    const res = await axios.get("/admin/room/roomType");
    setVacantRoom(res.data);
    return res.data;
  };

  const searchAllBooking = async () => {
    const res = await axios.get("/admin/booking");
    setVacantRoom(res.data);
    return res.data;
  };

  return (
    <SearchContext.Provider
      value={{
        vacantRoom,
        searchVacantRoom,
        searchBooking,
        bookingRoom,
        searchAllRoom,
        searchAllRoomType,
        searchAllBooking,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
