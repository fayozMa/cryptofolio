import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Chart from "../components/details/Chart";
import DOMPurify from "dompurify";
import Control from "../components/details/Control";
function Details() {
  const [data, setData] = useState(null);
  const currency = useSelector((state) => state.home.currency);
  const currency_lower = currency?.toLowerCase();
  const { id } = useParams();
  const nums = [
    3.45245, 5.6789, 2.34567, 9.87654, 1.23456, 4.56789, 6.78901, 0.12345,
    8.34567, 7.89012,
  ];

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(
          data.market_data.price_change_percentage_24h_in_currency[
            currency_lower
          ]
        );
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {data && (
        <div className="flex justify-between mt-6">
          <div className="px-6 max-w-[547px] border-r-2 border-gray-600">
            <div className="flex flex-col items-center">
              <img
                src={data.image?.large}
                alt="image of this crypto"
                width={200}
              />
              <h2 className="mt-5 text-white text-5xl font-montserrat font-bold leading-[56px]">
                {data.name}
              </h2>
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  data.description?.en || "No description available."
                ),
              }}
              className="prose prose-a:text-blue-500 prose-a:underline mt-4 text-white font-montserrat leading-7"
            />
            <div className="flex flex-col gap-5 mt-8 mb-16">
              <p className="font-montserrat font-bold text-2xl leading-8 text-white">
                Rank:{" "}
                <span className="font-normal">{data.market_cap_rank}</span>
              </p>
              <p className="font-montserrat font-bold text-2xl leading-8 text-white">
                Current Price:{" "}
                <span className="font-normal">
                  {currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "₹ "}
                  {data.market_data.current_price[
                    currency_lower
                  ].toLocaleString(
                    currency === "USD"
                      ? "en-US"
                      : currency === "EUR"
                      ? "de-DE"
                      : "en-IN"
                  )}
                </span>
              </p>
              <p className="font-montserrat font-bold text-2xl leading-8 text-white">
                Market Cap:{" "}
                <span className="font-normal">
                  {currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "₹ "}
                  {data.market_data.market_cap[currency_lower].toLocaleString(
                    currency === "USD"
                      ? "en-US"
                      : currency === "EUR"
                      ? "de-DE"
                      : "en-IN"
                  )}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 pr-6 mt-16">
            <Chart data={nums} />
            <Control />
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
