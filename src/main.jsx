import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { EnrollmentProvider } from './context/EnrollmentContext.jsx'
import { ProgressProvider } from './context/ProgressContext.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <EnrollmentProvider>
          <ProgressProvider>
            <SocketProvider>
              <App />
            </SocketProvider>
          </ProgressProvider>
        </EnrollmentProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
