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

  // useCallback
  const searchBooking = useCallback(async () => {
    try {
      const res = await axios.get("/user/booking");
      setBookingRoom(res.data);
      return res.data;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{
        vacantRoom,
        searchVacantRoom,
        searchBooking,
        bookingRoom,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
