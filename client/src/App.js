import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getToken } from './utils/Sessions'

import Logout from './components/Logout'
import HomePage from "./components/HomePage.js"
import ContactUs from "./components/ContactUs.js"
import HowToApply from "./components/HowToApply.js"
import Error from "./components/Error.js"
import WithHeaderFooter from "./components/WithHeaderFooter"
import Profile from './components/Profile'
import SignUpStartPage from './components/SignUpStartPage'
import SignInStartPage from './components/SignInStartPage'
import MyApplications from './components/MyApplications'
import ApplicantHomePage from './components/ApplicantHomePage'

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
		  return <Navigate to="/home" />
		}

		return children
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route 
					path="/home"
					element={
						<PrivateRoute>
							<ApplicantHomePage user={{name:"Ritik", email:"ritikgarg@gmail.com", imageUrl: ""}}/>
						</PrivateRoute>
					}
				/>
				<Route
					path="/my-profile"
					element={
						<PrivateRoute>
						<Profile user={{name:"Ritik", email:"ritikgarg@gmail.com", imageUrl: ""}} />
						</PrivateRoute>
					}
				/>
				<Route
					path="/my-applications"
					element={
						<PrivateRoute>
						<MyApplications user={{name:"Ritik", email:"ritikgarg@gmail.com", imageUrl: ""}}/>
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
          
				<Route element={<WithHeaderFooter/>}>
					<Route path="/" element={<HomePage/>}></Route>
					<Route path="/how-to-apply" element={<HowToApply />}></Route>
					<Route path="/contact-us" element={<ContactUs />}></Route>
					<Route 
						path='/sign-in' 
						element={
							<SpecialRoute>
							<SignInStartPage/>
							</SpecialRoute>
						} 
					/>
					<Route 
						path='/sign-up' 
						element={
							<SpecialRoute>
							<SignUpStartPage />
							</SpecialRoute>
						} 
					/>
					<Route path="*" element={<Error/>}></Route>
    			</Route>

			</Routes>
		</BrowserRouter>
	);
}

export default App;