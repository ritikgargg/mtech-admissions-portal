import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getToken } from './utils/Sessions'

import Dashboard from './components/Dashboard'
import Logout from './components/Logout'
import SignInNav from './components/SignInNav'
import HomePage from "./components/HomePage.js"
import ContactUs from "./components/ContactUs.js"
import HowToApply from "./components/HowToApply.js"
import Error from "./components/Error.js"
import SignUpStartPage from "./components/SignUpStartPage.js"
import ApplicantDetails from "./components/ApplicantDetails"
import WithoutHeaderFooter from "./components/WithoutHeaderFooter"
import WithHeaderFooter from "./components/WithHeaderFooter"
import PersonalInfo from "./components/PersonalInfo"
import Profile from './components/Profile'

function App() {
	// Pages that can only be accessed if you are logged in
	const PrivateRoute = ({ children }) => {
		const isAuthenticated = getToken();
			
		if (isAuthenticated ) {
		  return children
		}
		  
		return <Navigate to="error" />
	}

	// Login page can only be accessed if you are logged out
	const SpecialRoute = ({ children }) => {
		const isAuthenticated = getToken();
			
		if (isAuthenticated ) {
		  return <Navigate to="/dashboard" />
		}

		return children
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<WithHeaderFooter/>}>
					<Route 
						path='/log-in' 
						element={
							<SpecialRoute>
							<SignInNav/>
							</SpecialRoute>
						} 
					/>
				</Route>
				
				<Route
					path="/dashboard"
					element={
						
						<Dashboard />
				
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
          
				<Route element={<WithHeaderFooter/>}>
					<Route path="/" element={<HomePage/>}></Route>
					<Route path="/how-to-apply" element={<HowToApply />}></Route>
					<Route path="/contact-us" element={<ContactUs />}></Route>
					<Route path="/sign-up" element={<SignUpStartPage />}></Route>
					<Route path="*" element={<Error/>}></Route>
    			</Route>

				<Route element={<WithoutHeaderFooter/>}>
					<Route path="/sign-up-form" element={<ApplicantDetails />} ></Route>
				</Route>

			</Routes>
		</BrowserRouter>
	);
}

export default App;