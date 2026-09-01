import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App-removed.jsx'
import './index.css'

import Consent from './pages/consent-registration';
import AppRoutes from './routes/'; // Import your routes

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
)