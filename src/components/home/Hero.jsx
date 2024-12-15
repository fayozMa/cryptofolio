import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
function Hero() {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currency = useSelector((state) => state.home.currency);
  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
    if (data) {
      setShowData(data.slice(0, 4));
      const timer = setInterval(() => {
        setCurrentIndex((currentIndex) => {
          const nextIndex = currentIndex + 4;
          if (nextIndex >= data.length) {
            setShowData(data.slice(0, 4));
            return 0;
          } else {
            setShowData(data.slice(nextIndex, nextIndex + 4));
            return nextIndex;
          }
        });
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [data, currency]);

  return (
    <div className="bg-[url('./hero_bg.png')]">
      <div className="container mx-auto">
        <div className="pt-8 pb-6 mb-4">
          <h1 className="font-bold text-6xl leading-[72px] text-center text-lightBlue mt-4 font-montserrat">
            CRYPTOFOLIO WATCH LIST
          </h1>
          <p className="text-[#A9A9A9] font-montserrat font-medium text-sm leading-5 text-center">
            Get all the Info regarding your favorite Crypto Currency
          </p>
        </div>
        <div className="py-7 mx-32 flex items-center gap-48">
          {showData.map((crypto) => (
            <div key={crypto.id} className="flex flex-col items-center">
              <img
                src={crypto.image}
                alt="crypto image"
                className="w-20 h-20"
              />

              <div className="flex items-end gap-1">
                <h3 className="mt-3 text-white font-roboto leading-5 uppercase">
                  {crypto.symbol}
                </h3>
                <p
                  className={`${
                    crypto.ath_change_percentage > 0
                      ? "text-green-500"
                      : "text-red-500"
                  } font-roboto font-medium leading-5`}
                >
                  {crypto.ath_change_percentage.toFixed(2)}%
                </p>
              </div>

              <p className="text-white font-roboto font-medium text-xl leading-6 flex items-center gap-1">
                {currency === "USD" ? "$" : currency === "EUR" ? "€" : "₹"}
                {crypto.current_price.toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
