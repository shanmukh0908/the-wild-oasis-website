import Spinner from "../_components/Spinner";

export default function loadinig() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <div>
        <p className="text-xl text-primary-200">loading cabin data ... </p>
      </div>
    </div>
  );
}
