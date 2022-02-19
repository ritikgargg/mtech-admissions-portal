import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SignInNav from './components/SignInNav';

function App() {
return (
	<BrowserRouter>
	<Routes>
        <Route exact path='/dashboard' element={<Dashboard/>} />
		<Route exact path='/' element={<SignInNav/>} />
	</Routes>
	</BrowserRouter>
);
}

export default App;