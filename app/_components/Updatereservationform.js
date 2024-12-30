"use client";

import { useFormStatus } from "react-dom";
import { updatereservationaction } from "../_lib/actions";

export default function Updatereservationform({ reservationId, maxCapacity }) {
  return (
    <form
      action={updatereservationaction}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <input type="hidden" name="bookingid" value={reservationId} />
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          id="numGuests"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>
      <Button />
      <div className="flex justify-end items-center gap-6"></div>
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {!pending ? "Update reservation" : "updating..."}
    </button>
  );
}
