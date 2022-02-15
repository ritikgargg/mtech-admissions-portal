import './App.css';
import HomePage from './components/HomePage.js';
import Footer from './components/Footer.js';
import ContactUs from './components/ContactUs.js';
import HowToApply from './components/HowToApply.js';
import NewHomePage from './components/NewHomePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      {/* <HomePage/> */}
      {/* <ContactUs/> */}
      {/* <HowToApply/> */}
      <Navbar/>
      <NewHomePage/>
      <Footer/>
    </div>
  );
}

export default App;
