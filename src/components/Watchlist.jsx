import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle, remove } from "../store/homeSlice";

const Watchlist = () => {
  const watched = useSelector((state) => state.home.watched);
  const currency = useSelector((state) => state.home.currency);
  const visible = useSelector((state) => state.home.visible)
  const dispatch = useDispatch();

  if (!visible) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-[#515151] text-white px-4 shadow-lg">
      <div className="flex items-center justify-between mb-10 mt-8">
        <h2 className="font-roboto font-medium text-3xl leading-6 text-center flex-1">
          Watchlist
        </h2>
        <button
          onClick={() => dispatch(toggle(false))}
          className="text-red-500 font-bold text-xl"
        >
          X
        </button>
      </div>
      <ul className="flex flex-wrap gap-5">
        {watched.map((item) => (
          <li
            key={item.id}
            className="flex flex-col items-center w-32 p-3 bg-darkGray mb-2 rounded-3xl"
          >
            <img src={item.image} alt="crypto image" width={80} />
            <span className="mt-8 font-roboto text-xl leading-5 text-right">
              {currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "₹ "}
              {item.price.toLocaleString(
                currency === "USD"
                  ? "en-US"
                  : currency === "EUR"
                  ? "de-DE"
                  : "en-IN"
              )}
            </span>
            <button
              onClick={() => dispatch(remove(item.id))}
              className="bg-red-500 mt-3 text-white px-2 py-1 rounded font-roboto text-xl leading-5 text-right"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
