import Header from "@/app/_components/Header";
import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import globals from "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { Reservationprovider } from "./_components/context";
const josefins = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: { template: "%s / the wild oasis", default: "the wild oasis" },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body
        className={`${josefins.className} bg-primary-950 text-primary-50 min-h-screen flex flex-col antialiased`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <Reservationprovider>{children}</Reservationprovider>
          </main>
        </div>
      </body>
    </html>
  );
}
