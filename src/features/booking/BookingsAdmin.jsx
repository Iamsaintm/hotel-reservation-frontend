import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useSearch } from "../../hooks/use-search";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import AdminAction from "./AdminAction";
import { formatDate } from "../../utils/set-date";

function BookingDetails({
  booking,
  users,
  rooms,
  handleDelete,
  fetchBookingData,
}) {
  const user = users[booking.userId];
  const room = rooms[booking.roomId];
  return (
    <div key={booking.id}>
      <p>ID: {booking.id}</p>
      <p>Start Date: {formatDate(booking.startDate)}</p>
      <p>End Date: {formatDate(booking.endDate)}</p>
      <p>User ID: {booking.userId}</p>
      <p>Payment: {booking.isPayment}</p>
      <p>
        User Name: {user?.firstName} {user?.lastName}
      </p>
      <p>User Phone: {user?.phoneNumber}</p>
      <p>User Email: {user?.email}</p>
      <p>Room ID: {booking.roomId}</p>
      <p>Room Number: {room?.roomNumber}</p>
      <p>Room Type: {room?.roomType}</p>
      <p>Room Price: {room?.roomPrice}</p>
      {booking.isPayment === "PENDING" && (
        <AdminAction
          bookingId={booking.id}
          fetchBookingData={fetchBookingData}
        />
      )}

      <Button onClick={() => handleDelete(booking.id)}>Delete</Button>
    </div>
  );
}

export default function BookingsAdmin() {
  const { searchAllBooking, searchAllRoom, searchAllRoomType, searchUser } =
    useSearch();
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState({});
  const [users, setUsers] = useState({});

  const deleteBooking = async (bookingId) => {
    try {
      await axios.delete(`/admin/booking/${bookingId}`);
      toast.success("booking delete successfully");
    } catch (error) {
      console.error("Error creating booking: ", error);
      toast.error("Error creating booking");
    }
  };

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
      }, {});
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
      await deleteBooking(bookingId);
      fetchBookingData();
    } catch (error) {
      console.error("Error deleting booking: ", error);
    }
  };

  return (
    <div>
      {bookings.map((booking) => (
        <BookingDetails
          booking={booking}
          users={users}
          rooms={rooms}
          handleDelete={handleDelete}
          key={booking.id}
          fetchBookingData={fetchBookingData}
        />
      ))}
    </div>
  );
}
