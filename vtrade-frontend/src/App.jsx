import "./App.css";
import { Header } from "./components/common/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/general/Home";
import { SignUp } from "./pages/authentication/SignUp";
import { SignIn } from "./pages/authentication/SignIn";
import { About } from "./pages/general/About";
import { Profile } from "./pages/authentication/Profile";
import Layout from "./components/common/Layout";
function App() {
  return (
    <BrowserRouter>
      <Layout>
      <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default App;
