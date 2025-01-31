import ReservationCard from "@/app/_components/ReservationCard";
import Reservationlist from "@/app/_components/Reservationlist";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";

export default async function Page() {
  // CHANGE
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);
  // console.log(bookings);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <Reservationlist bookings={bookings} />
      )}
    </div>
  );
}
