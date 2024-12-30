import Updatereservationform from "@/app/_components/Updatereservationform";
import { updatereservationaction } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const booking = await getBooking(params.id);
  const cabin = await getCabin(booking.cabinId);
  const reservationId = params.id;
  const maxCapacity = cabin.maxCapacity;
  // console.log(cabin, booking);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>
      <Updatereservationform
        maxCapacity={maxCapacity}
        reservationId={reservationId}
      />
    </div>
  );
}
