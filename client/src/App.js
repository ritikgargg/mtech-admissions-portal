import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import SignInNav from './components/SignInNav';
import { getToken } from './utils/Sessions';

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

function App() {
	const PrivateRoute = ({ children}) => {
		const isAuthenticated = getToken();
			
		if (isAuthenticated ) {
		  return children
		}
		  
		return <Navigate to="/" />
	}

	const PublicRoute = ({ children}) => {
		const isAuthenticated = getToken();
			
		if (isAuthenticated ) {
		  return <Navigate to="/dashboard" />
		}

		return children
	}

	return (
		<BrowserRouter>
		<Routes>
			<Route 
				path='/' 
				element={
					<PublicRoute>
					<SignInNav/>
					</PublicRoute>
				} 
			/>
			<Route
				path="/dashboard"
				element={
					<PrivateRoute>
					<Dashboard />
					</PrivateRoute>
				}
			/>
			<Route
				path="/logout"
				element={
					<PrivateRoute>
					<Logout />
					</PrivateRoute>
				}
			/>
          
       // May require change
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