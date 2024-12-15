import Navbar from "../components/Navbar";
import Watchlist from "../components/home/Watchlist";
function MainLayout({ children }) {
  return (
    <div className="bg-darkGray">
      <Navbar />
      <Watchlist/>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default MainLayout;
