import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignInNav from './components/SignInNav';
import Dashboard from './components/Dashboard';

ReactDOM.render(
  <React.StrictMode>
    <Dashboard/>
    {/* <SignInNav/> */}
  </React.StrictMode>,
  document.getElementById('root')
);
