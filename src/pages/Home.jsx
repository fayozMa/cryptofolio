import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/home/Hero";
import ResponsivePaginationComponent from "react-responsive-pagination";
import "../css/pagination.css";
import { add } from "../store/homeSlice";

function Home() {
  const [data, setData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page") || 1)
  );
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const currency = useSelector((state) => state.home.currency);
  const watched = useSelector((state) => state.home.watched);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPage) {
      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=${currentPage}&sparkline=false&price_change_percentage=24h`
      )
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setIsError(false);
        })
        .catch(() => setIsError(true));
    }
  }, [currentPage, currency]);

  useEffect(() => {
    if (search && data && !search.trim() == "") {
      const searching = search.toLowerCase();
      const filtered = data.filter(
        (crypto) =>
          crypto.id.toLowerCase().includes(searching) ||
          crypto.name.toLowerCase().includes(searching) ||
          crypto.symbol.toLowerCase().includes(searching)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [search, data]);



  const handleChangePagination = (page) => {
    setCurrentPage(page);
    setSearchParams({ page });
  };

  const handleList = (image, price, id) => {
    if (!watched.some((item) => item.id === id)) {
      dispatch(add({ image, price, id }));
    }
    navigate(`details/${id}`);
  };
  return (
    <div>
      <Hero />
      <div className="container mx-auto pb-5">
        <h2 className="text-center font-montserrat text-4xl leading-10 text-white mt-5">
          Cryptocurrency Prices by Market Cap
        </h2>
        <form method="post">
          <input
            type="text"
            placeholder="Search For a Crypto Currency.."
            className="input bg-transparent input-bordered w-full mt-3 mb-5"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <table className="table-auto w-full text-left border-collapse text-sm mt-5">
          <thead className="bg-lightBlue text-black py-5 px-4 rounded">
            <tr>
              <th className="px-4 py-2 font-montserrat font-bold text-sm leading-6">
                Coin
              </th>
              <th className="px-4 py-2 font-montserrat font-bold text-sm leading-6 text-right">
                Price
              </th>
              <th className="px-4 py-2 font-montserrat font-bold text-sm leading-6 text-right">
                24h Change
              </th>
              <th className="px-4 py-2 font-montserrat font-bold text-sm leading-6 text-right">
                Market Cap
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark-gray text-white">
            {filteredData &&
              filteredData.map((crypto) => (
                <tr
                  key={crypto.id}
                  className="border-b border-gray-600 bg-[#16171A]"
                >
                  <td
                    className="px-4 py-2 flex items-center gap-4 cursor-pointer"
                    onClick={() =>
                      handleList(crypto.image, crypto.current_price, crypto.id)
                    }
                  >
                    <img
                      src={crypto.image}
                      alt={crypto.name}
                      className="w-8 h-8"
                    />
                    <div>
                      <p className="font-bold">{crypto.symbol.toUpperCase()}</p>
                      <p className="text-xs text-gray-400">{crypto.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right">
                    {currency === "USD"
                      ? "$ "
                      : currency === "EUR"
                      ? "€ "
                      : "₹ "}
                    {crypto.current_price.toLocaleString(
                      currency === "USD"
                        ? "en-US"
                        : currency === "EUR"
                        ? "de-DE"
                        : "en-IN"
                    )}
                  </td>
                  <td className="flex items-center pb-2 justify-end">
                    <img
                      src={
                        watched.some((item) => item.id === crypto.id)
                          ? "../eye_green.svg"
                          : "../eye.svg"
                      }
                      alt="watched status"
                    />
                    <p
                      className={`px-4 font-bold text-right ${
                        crypto.price_change_percentage_24h > 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {crypto.price_change_percentage_24h?.toFixed(2) > 0
                        ? `+${crypto.price_change_percentage_24h.toFixed(2)}`
                        : crypto.price_change_percentage_24h?.toFixed(2)}
                      %
                    </p>
                  </td>
                  <td className="px-4 py-2 text-right">
                    {currency === "USD"
                      ? "$ "
                      : currency === "EUR"
                      ? "€ "
                      : "₹ "}
                    {crypto.market_cap.toLocaleString(
                      currency === "USD"
                        ? "en-US"
                        : currency === "EUR"
                        ? "de-DE"
                        : "en-IN"
                    )}{" "}
                    M
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {isError ? (
        <div className="text-center text-red-500 py-4 font-semibold">
          SORRY! API limit is reached, wait for a minute and try again
        </div>
      ) : (
        <ResponsivePaginationComponent
          current={currentPage}
          total={1608}
          onPageChange={handleChangePagination}
          maxWidth={600}
          previousLabel="<"
          nextLabel=">"
        />
      )}
    </div>
  );
}

export default Home;
