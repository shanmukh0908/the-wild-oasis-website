import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

export default async function Cabinlist({ filter = "all" }) {
  // noStore(); this will make the component dynamic and there by the entire route dynamic and hence disable the caching
  const cabins = await getCabins();
  if (cabins.length <= 0) return null;

  let displayedcabins;

  if (filter === "all") displayedcabins = cabins;

  if (filter === "small")
    displayedcabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 1 && cabin.maxCapacity <= 3
    );

  if (filter === "medium")
    displayedcabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity <= 7
    );

  if (filter === "large")
    displayedcabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 8 && cabin.maxCapacity <= 12
    );

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedcabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
