import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Layout from './components/Layout.tsx'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            <Login onLoginSuccess={() => setIsAuthenticated(true)} />
          } 
        />
        <Route
          path="/dashboard"
          element={
          
              <Layout>
                <Dashboard />
              </Layout>
            
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

export default App