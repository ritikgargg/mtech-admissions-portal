import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getToken } from './components/SignIn_SignUp/Sessions'
import Logout from './components/SignIn_SignUp/Logout'
import HomePage from "./components/Landing/HomePage"
import ContactUs from "./components/Landing/ContactUs"
import HowToApply from "./components/Landing/HowToApply"
import FAQs from "./components/Landing/FAQs"
import Error from "./components/Landing/Error"
import WithHeaderFooter from "./components/Landing/WithHeaderFooter"
import Profile from './components/Applicant/Profile'
import SignUpStartPage from './components/SignIn_SignUp/SignUpStartPage'
import SignInStartPage from './components/SignIn_SignUp/SignInStartPage'
import MyApplications from './components/Applicant/MyApplications'
import ApplicantHomePage from './components/Applicant/ApplicantHomePage'
import ApplicantionDetails from './components/Applicant/ApplicationDetails'
import ViewSubmittedApplication from './components/Applicant/ViewSubmittedApplication'
import Courses from './components/Landing/Courses'
import Info from './components/Landing/Info'
import Success from './components/Applicant/Success'

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
				<Route path="/home" element={<PrivateRoute><ApplicantHomePage/></PrivateRoute>} />
				<Route path="/my-profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
				<Route path="/my-applications" element={<PrivateRoute><MyApplications/></PrivateRoute>} />
				<Route path="/apply/:offering_id" element={<PrivateRoute><ApplicantionDetails /></PrivateRoute>} />
				<Route path="/view/:application_id" element={<PrivateRoute><ViewSubmittedApplication /></PrivateRoute>} />
				<Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
				<Route path="/success" element={<Success/>}></Route>

				<Route element={<WithHeaderFooter/>}>
					<Route path="/" element={<HomePage/>}></Route>
					<Route path="/how-to-apply" element={<HowToApply />}></Route>
					<Route path="/contact-us" element={<ContactUs />}></Route>
					<Route path="/faqs" element={<FAQs />}></Route>
					<Route path="/courses" element={<Courses />}></Route>
					<Route path="/info" element={<Info />}></Route>
					<Route path='/sign-in' element={<SpecialRoute><SignInStartPage/></SpecialRoute>} />
					<Route path='/sign-up' element={<SpecialRoute><SignUpStartPage/></SpecialRoute>} />
					
					<Route path="/*" element={<Error/>}></Route>
    			</Route>

			</Routes>
		</BrowserRouter>
	);
}

export default App;