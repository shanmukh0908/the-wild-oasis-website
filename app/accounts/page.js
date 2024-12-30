import { auth } from "../_lib/auth";

export const metadata = {
  title: "account",
};

export default async function Page() {
  const session = await auth();
  return (
    <div>
      <h1> welcome {session.user.name}</h1>
    </div>
  );
}
