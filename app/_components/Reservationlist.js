"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteresrvationaction } from "../_lib/actions";

export default function Reservationlist({ bookings }) {
  const [optimisticbookings, optimisticdeletion] = useOptimistic(
    bookings,
    (currentbookings, bookingId) => {
      return currentbookings.filter((booking) => booking.id !== bookingId);
    }
  );
  function handledelete(bookingId) {
    optimisticdeletion(bookingId);
    deleteresrvationaction(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticbookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handledelete}
        />
      ))}
    </ul>
  );
}
