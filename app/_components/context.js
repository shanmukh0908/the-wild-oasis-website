"use client";
const { createContext, useContext, useState } = require("react");

const Reservationcontext = createContext();
const initialstate = { from: null, to: null };

function Reservationprovider({ children }) {
  const [range, setrange] = useState(initialstate);
  const resetRange = () => setrange(initialstate);
  return (
    <Reservationcontext.Provider value={{ range, setrange, resetRange }}>
      {children}
    </Reservationcontext.Provider>
  );
}
function usereservation() {
  const context = useContext(Reservationcontext);
  if (context === undefined)
    throw new Error("context used outside of the provider");
  return context;
}

export { Reservationprovider, usereservation };
