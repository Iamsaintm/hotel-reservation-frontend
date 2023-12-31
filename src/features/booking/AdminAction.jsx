import axios from "../../config/axios";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { AcceptIcon, RejectIcon } from "../../icon";

export default function ReceiverAction({ bookingId, fetchBookingData }) {
  const handleClickAccept = async () => {
    try {
      await axios.patch(`admin/booking/payment/${bookingId}`);
      fetchBookingData();
      toast.success("Payment accepted successfully");
    } catch (err) {
      console.error("Error accepting payment:", err);
      toast.error("Failed to accept payment");
    }
  };

  const handleClickReject = async () => {
    try {
      await axios.patch(`admin/booking/payment/${bookingId}/reject`);
      fetchBookingData();
      toast.success("Payment rejected successfully");
    } catch (err) {
      console.error("Error rejecting payment:", err);
      toast.error("Failed to reject payment");
    }
  };

  return (
    <div className="flex gap-4">
      <Button className="bg-green-500" onClick={handleClickAccept}>
        <AcceptIcon />
      </Button>
      <Button className="bg-red-500" onClick={handleClickReject}>
        <RejectIcon />
      </Button>
    </div>
  );
}
