import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { timeControl } from "../../store/homeSlice";
function Control() {
  const time = useSelector((state) => state.home.time);
  const dispatch = useDispatch();

  const handleClick = (time) => {
    dispatch(timeControl(time));
  };

  return (
    <div className="flex items-center gap-8 text-white">
      <button
        onClick={() => handleClick("Hour")}
        className={`w-52 border border-solid border-[#87CEEB] rounded-md font-montserrat leading-5 py-3 text-left pl-5 ${
          time == "Hour" ? "bg-lightBlue   font-bold text-black" : ""
        } `}
      >
        24 Hours
      </button>
      <button
        onClick={() => handleClick("Day")}
        className={`w-52 border border-solid border-[#87CEEB] rounded-md font-montserrat leading-5 py-3 text-left pl-5 ${
          time == "Day" ? "bg-lightBlue font-bold text-black" : ""
        } `}
      >
        30 Days
      </button>
      <button
        onClick={() => handleClick("Month")}
        className={`w-52 border border-solid border-[#87CEEB] rounded-md font-montserrat leading-5 py-3 text-left pl-5 ${
          time == "Month" ? "bg-lightBlue font-bold text-black" : ""
        } `}
      >
        3 Months
      </button>
      <button
        onClick={() => handleClick("Year")}
        className={`w-52 border border-solid border-[#87CEEB] rounded-md font-montserrat leading-5 py-3 text-left pl-5 ${
          time == "Year" ? "bg-lightBlue font-bold text-black " : ""
        } `}
      >
        1 Year
      </button>
    </div>
  );
}

export default Control;
