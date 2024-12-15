import Navbar from "../components/Navbar";
function MainLayout({ children }) {
  return (
    <div className="bg-darkGray min-h-screen">
      <Navbar />
      <div>{children}</div>
    </div>
  );
}

export default MainLayout;
