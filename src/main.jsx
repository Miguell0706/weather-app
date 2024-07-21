import React from 'react'
import ReactDOM from 'react-dom/client'
import MainDashboard from './components/MainDashboard.jsx'
import './styles/index.css'; // Adjusted import path


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainDashboard />
  </React.StrictMode>,
)
