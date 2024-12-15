// router-dom
import { Link } from "react-router-dom";
//redux-toolkit
import { useDispatch, useSelector } from "react-redux";
import { change,toggle } from "../store/homeSlice";
function Navbar() {
  //redux
  const home = useSelector((state) => state.home);
  const visible = useSelector((state) => state.home.visible);
  //dispatch
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center pt-4 container mx-auto">
      <Link
        to="/"
        className="text-lightBlue font-bold text-xl leading-8 font-montserrat"
      >
        CRYPTOFOLIO
      </Link>
      <div className="flex gap-4 items-center">
        <select
          name="currency"
          defaultValue={home.currency}
          className="select bg-darkGray text-white font-roboto"
          onChange={(e) => dispatch(change(e.target.value))}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
        </select>
        <button onClick={()=>dispatch(toggle(!visible))} className="bg-lightBlue font-roboto px-4 py-2 text-[#000000DE] rounded font-medium text-sm leading-6 text-center">
          WATCH LIST
        </button>
      </div>
    </div>
  );
}

export default Navbar;
