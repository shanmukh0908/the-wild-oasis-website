"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { redirect } from "next/navigation";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";

export async function signinaction() {
  await signIn("google", { redirectTo: "/accounts" });
}

export async function signoutaction() {
  await signOut({ redirectTo: "/" });
}

export async function updaeprofileaction(formData) {
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");
  const session = await auth();
  if (!session) throw new Error("please login first");
  const updatedata = { nationality, nationalID, countryFlag };

  await updateGuest(session.user.guestId, updatedata);

  revalidatePath("/accounts/profile");
}

export async function deleteresrvationaction(bookingid) {
  const session = await auth();
  if (!session) throw new Error("please login first");
  const bookingids = (await getBookings(session.user.guestId)).map(
    (booking) => booking.id
  );
  if (!bookingids.includes(bookingid))
    throw new Error("you are not authorised to perform this delete action");

  await deleteBooking(bookingid);

  revalidatePath("/accounts/reservations");
}

export async function updatereservationaction(formData) {
  const session = await auth();
  if (!session) throw new Error("please login first");
  const bookingid = Number(formData.get("bookingid"));
  const bookingids = (await getBookings(session.user.guestId)).map(
    (booking) => booking.id
  );
  // console.log(bookingid, bookingids);
  if (!bookingids.includes(bookingid))
    throw new Error("you are not authorised to perform this action");

  const updatedata = {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations"),
  };
  await updateBooking(bookingid, updatedata);
  revalidatePath("/accounts/reservations");
  redirect("/accounts/reservations");
}

export async function createbookingaction(bookingdata, formData) {
  const session = await auth();
  if (!session) throw new Error("please login first");
  const bookingData = {
    ...bookingdata,
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations"),
    guestId: session.user.guestId,
  };

  await createBooking(bookingData);
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thanku");
}
