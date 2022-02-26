import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getToken } from './components/SignIn_SignUp/Sessions'
import Logout from './components/SignIn_SignUp/Logout'
import HomePage from "./components/Public/HomePage"
import ContactUs from "./components/Public/ContactUs"
import HowToApply from "./components/Public/HowToApply"
import Error from "./components/Public/Error"
import WithHeaderFooter from "./components/Public/WithHeaderFooter"
import Profile from './components/Applicant/Profile'
import SignUpStartPage from './components/SignIn_SignUp/SignUpStartPage'
import SignInStartPage from './components/SignIn_SignUp/SignInStartPage'
import MyApplications from './components/Applicant/MyApplications'
import ApplicantHomePage from './components/Applicant/ApplicantHomePage'

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