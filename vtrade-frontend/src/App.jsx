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

function App() {
  // const notify = () => toast("Wow so easy!");
  return (
    <>
      <BrowserRouter>
        {/* <button onClick={notify}>BTN</button> */}
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
            </Route>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <ToastContainer
        // className="fixed top-0 right-0 z-50"
        position="top-right"
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

//TODO: Global loader to be added
