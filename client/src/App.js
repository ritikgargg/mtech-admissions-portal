import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import SignInNav from './components/SignInNav';
import { getToken } from './utils/Sessions';

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
		</Routes>
		</BrowserRouter>
	);
}

export default App;