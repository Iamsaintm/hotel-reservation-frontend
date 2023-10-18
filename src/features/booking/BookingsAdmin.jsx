import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useSearch } from "../../hooks/use-search";

export default function BookingsAdmin({ deleteBooking }) {
  const { searchAllBooking, searchAllRoom, searchAllRoomType, searchUser } =
    useSearch();
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState({});
  const [users, setUsers] = useState({});

  const fetchRoomData = async () => {
    try {
      const roomData = await searchAllRoom();
      const roomTypeData = await searchAllRoomType();

      const roomTypesMap = {};
      roomTypeData.forEach((rt) => {
        roomTypesMap[rt.id] = rt;
      });

      const roomsWithRoomTypes = roomData.map((room) => ({
        ...room,
        roomType: roomTypesMap[room.roomTypeId],
      }));

      const roomInfo = roomsWithRoomTypes.reduce((acc, room) => {
        acc[room.id] = {
          roomNumber: room.roomNumber,
          roomType: room.roomType.roomType,
          roomPrice: room.roomType.roomPrice,
        };
        return acc;
      });

      setRooms(roomInfo);
    } catch (error) {
      console.error("Error fetching room data: ", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await searchUser();
      const usersInfo = userData.reduce((acc, user) => {
        acc[user.id] = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          email: user.email,
        };
        return acc;
      });
      setUsers(usersInfo);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const fetchBookingData = async () => {
    try {
      const bookingData = await searchAllBooking();
      setBookings(bookingData);
    } catch (error) {
      console.error("Error fetching booking data: ", error);
    }
  };

  useEffect(() => {
    fetchRoomData();
    fetchBookingData();
    fetchUserData();
  }, []);

  const handleDelete = async (bookingId) => {
    try {
      console.log(bookingId);
      await deleteBooking(bookingId);
      fetchBookingData();
    } catch (error) {
      console.error("Error deleting booking: ", error);
    }
  };

  return (
    <div>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>ID: {booking.id}</p>
          <p>Start Date: {booking.startDate}</p>
          <p>End Date: {booking.endDate}</p>
          <p>User ID: {booking.userId}</p>
          <p>
            User Name: {users[booking.userId]?.firstName}{" "}
            {users[booking.userId]?.lastName}
          </p>
          <p>User Phone: {users[booking.userId]?.phoneNumber}</p>
          <p>User Email: {users[booking.userId]?.email}</p>
          <p>Room ID: {booking.roomId}</p>
          <p>Room Number: {rooms[booking.roomId]?.roomNumber}</p>
          <p>Room Type: {rooms[booking.roomId]?.roomType}</p>
          <p>Room Price: {rooms[booking.roomId]?.roomPrice}</p>

          <Button>Edit</Button>
          <Button onClick={() => handleDelete(booking.id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
}
