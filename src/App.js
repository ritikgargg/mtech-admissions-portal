import './App.css';
import HomePage from './components/HomePage.js';
import Footer from './components/Footer.js';
import ContactUs from './components/ContactUs.js';
import HowToApply from './components/HowToApply.js';
import NewHomePage from './components/NewHomePage';
import Navbar from './components/Navbar';
import TempNavbar from './components/NewNavbar';

function App() {
  return (
    <div className="App">
      {/* <HomePage/> */}
      {/* <ContactUs/> */}
      {/* <HowToApply/> */}
      <TempNavbar/>
      <NewHomePage/>
      <Footer/>
    </div>
  );
}

export default App;
