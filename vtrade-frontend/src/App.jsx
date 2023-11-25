import "./App.css";
import { Header } from "./components/common/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/general/Home";
import { SignUp } from "./pages/authentication/SignUp";
import { SignIn } from "./pages/authentication/SignIn";
import { About } from "./pages/general/About";
import { Profile } from "./pages/user/Profile";
import Layout from "./components/ui/Layout";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/auth/PrivateRoute";

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
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
export default App;

//TODO: Global loader to be added
