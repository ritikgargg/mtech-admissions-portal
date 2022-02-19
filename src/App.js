import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HomePage from "./components/HomePage.js";
import Footer from "./components/Footer.js";
import ContactUs from "./components/ContactUs.js";
import HowToApply from "./components/HowToApply.js";
import Error from "./components/Error.js"
import Navbar from "./components/Navbar.js";
import SignUpStartPage from "./components/SignUpStartPage.js";
import ApplicantDetails from "./components/ApplicantDetails";
import WithoutHeaderFooter from "./components/WithoutHeaderFooter";
import WithHeaderFooter from "./components/WithHeaderFooter";
import SignInNav from "./components/SignInNav";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route element={<WithHeaderFooter/>}>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/how-to-apply" element={<HowToApply />}></Route>
      <Route path="/contact-us" element={<ContactUs />}></Route>
      <Route path="/log-in" element={<SignInNav/>}></Route>
      <Route path="*" element={<Error/>}></Route>
    </Route>

    <Route element={<WithoutHeaderFooter/>}>
      <Route path="/sign-up" element={<SignUpStartPage />}></Route>
      <Route path="/sign-up-form" element={<ApplicantDetails />} ></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
