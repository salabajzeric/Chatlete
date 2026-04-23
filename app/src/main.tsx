import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ResetPassword from './ResetPassword'
import { SupabaseAuthProvider } from './context/SupabaseAuthContext'
import './index.css'

const isResetPage = window.location.pathname === '/reset-password'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isResetPage ? (
      <ResetPassword />
    ) : (
      <SupabaseAuthProvider>
        <App />
      </SupabaseAuthProvider>
    )}
  </React.StrictMode>,
)