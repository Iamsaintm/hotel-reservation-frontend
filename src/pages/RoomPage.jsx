import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../hooks/use-auth";
import SearchRoom from "../features/search/SearchRoom";

export default function RoomPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { roomData, reservationData } = location.state || {};
  const { setShowLoginForm, authUser } = useAuth();

  if (!roomData || roomData.length === 0) {
    return (
      <div>
        <h1>Room Page</h1>
        <p>No room data available.</p>
      </div>
    );
  }

  const roomTypeCounts = roomData.reduce((acc, room) => {
    const roomType = room.roomType;
    if (roomType) {
      const { roomType: type, roomPrice, roomImage } = roomType;
      const key = `${type}`;
      if (!acc[key]) {
        acc[key] = {
          count: 1,
          roomPrice,
          roomImage,
        };
      } else {
        acc[key].count += 1;
      }
    }
    return acc;
  }, {});

  const handleButtonClick = (selectedRoomType) => {
    if (!authUser) {
      return setShowLoginForm(true);
    }

    const selectedRoom = roomData.find((room) => {
      const roomType = room.roomType;

      return roomType && roomType.roomType === selectedRoomType;
    });

    if (selectedRoom) {
      navigate("/booking", {
        state: { roomData: selectedRoom, reservationData },
      });
    } else {
      console.log("No matching room found");
    }
  };

  return (
    <div>
      <div className="bg-orange-600 w-1/3 py-3 flex justify-center mx-auto rounded-xl my-4">
        <SearchRoom
          startDate={reservationData.startDate}
          endDate={reservationData.endDate}
          guestLimit={reservationData.guestLimit}
        />
      </div>
      <div className="py-4 w-3/4 m-auto">
        <div className="grid grid-cols-2">
          {Object.keys(roomTypeCounts).map((roomType, index) => {
            const roomTypeCount = roomTypeCounts[roomType];
            return (
              <div key={index} className="flex flex-col m-8">
                <div className="mx-auto">
                  <div className="relative flex h-56 w-[600px] max-w-3xl items-start gap-4 overflow-hidden rounded-lg shadow-lg bg-gray-200 ">
                    <div className="flex-1">
                      <img
                        src={roomTypeCount.roomImage}
                        alt={roomType}
                        className="h-[250px] w-[300px] object-cover transition-all duration--300 group-hover:opacity-90"
                      />
                    </div>
                    <div className="flex-1 ">
                      <div className="flex flex-col gap-3 p-4">
                        <h1 className="text-xl"> Room Detail</h1>
                        <p className="text-base">Room Type: {roomType}</p>
                        <p className="text-base">
                          Room Price: {roomTypeCount.roomPrice}
                        </p>
                        <p className="text-base">
                          Count: {roomTypeCount.count}
                        </p>
                        <div className="flex gap-4 justify-end py-3">
                          <Button
                            className="h-10 "
                            onClick={() => {
                              handleButtonClick(roomType);
                            }}
                          >
                            Booking
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
