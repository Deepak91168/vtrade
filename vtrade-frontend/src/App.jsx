import "./App.css";
import { Header } from "./components/common/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/general/Home";
import { SignUp } from "./pages/authentication/SignUp";
import { SignIn } from "./pages/authentication/SignIn";
import { About } from "./pages/general/About";
import { Profile } from "./pages/user/Profile";
import Layout from "./components/ui/Layout";
import { ToastContainer, toast } from "react-toastify";
import PrivateRoute from "./components/auth/PrivateRoute";
import AddVehicle from "./pages/vehicle/AddVehicle";
import "react-toastify/dist/ReactToastify.css"; //? Required Toastify CSS
import EditVehicleDetails from "./pages/vehicle/EditVehicleDetails";
import SearchVehicle from "./pages/search/SearchVehicle";
import Vehicle from "./pages/vehicle/Vehicle";
import Buy from "./pages/buyandsell/Buy";
import Sell from "./pages/buyandsell/Sell";
import Footer from "./components/common/Footer";
import Custom404 from "./pages/general/Custom404";
function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/add-vehicle" element={<AddVehicle />} />
              <Route
                path="/edit-vehicle/:vehicleID"
                element={<EditVehicleDetails />}
              />
            </Route>
            <Route path="/vehicle/:vehicleID" element={<Vehicle />} />
            <Route path="/search" element={<SearchVehicle />} />
            <Route path="/buy-vehicle" element={<Buy />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="*" element={<Custom404 />} />
          </Routes>
          <Footer />
        </Layout>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
export default App;
