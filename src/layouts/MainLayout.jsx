import Navbar from "../components/Navbar";
import Watchlist from "../components/Watchlist";
function MainLayout({ children }) {
  return (
    <div className="bg-darkGray min-h-screen">
      <Navbar />
      <Watchlist/>
      <div>{children}</div>
    </div>
  );
}

export default MainLayout;
