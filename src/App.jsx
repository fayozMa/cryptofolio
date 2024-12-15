//rrd
import { Routes, Route } from "react-router-dom";
//layout
import MainLayout from "./layouts/MainLayout";
//pages
import Home from "./pages/Home";
import Details from "./pages/Details";
function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home></Home>
            </MainLayout>
          }
        ></Route>
        <Route
          path="details/:id"
          element={
            <MainLayout>
              <Details></Details>
            </MainLayout>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
