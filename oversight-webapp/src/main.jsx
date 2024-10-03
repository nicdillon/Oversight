import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
        domain="dev-b837c76axprar0qa.us.auth0.com"
        clientId="wymmPlz5BjH4cLvBQwLy0gI0CVAbFdIS"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
