import { useDispatch, useSelector } from "react-redux";
function Watchlist() {
  const visible = useSelector((state) => state.home.visible);
  const dispatch = useDispatch();
  const watched = useSelector((state) => state.home.watched);
  return (
    <div>
      {visible && (
        <div className="fixed top-0 right-0 h-full w-64 bg-gray-800 text-white p-4 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Watchlist</h2>
            <button
              onClick={dispatch(toggle(false))}
              className="text-red-500 font-bold"
            >
              X
            </button>
          </div>
          <ul>
            {watched.map((item,index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-700 mb-2 rounded"
              >
                <img src={item.image} alt="crypto image" />
                <span>{item.price}</span>
                <button
                  onClick={() => dispatch(remove(item.id))}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
