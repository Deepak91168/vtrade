import "./App.css";
import { Header } from "./components/common/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/general/Home";
import { SignOut } from "./pages/general/authentication/SignOut";
import { SignIn } from "./pages/general/authentication/SignIn";
import { About } from "./pages/general/About";
import { Profile } from "./pages/general/authentication/Profile";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-out" element={<SignOut />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
