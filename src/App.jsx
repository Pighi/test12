import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DashboardStudent from './pages/DashboardStudent'
import DashboardAdmin from './pages/DashboardAdmin'
import AddObservation from './pages/AddObservation'
import Trends from './pages/Trends'
import ProtectedRoute from './components/ProtectedRoute'
export default function App() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <div className='container mx-auto p-4'>
        <Routes>
          <Route path='/' element={<Navigate to='/dashboard' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <DashboardStudent />
            </ProtectedRoute>
          } />
          <Route path='/admin' element={
            <ProtectedRoute adminOnly>
              <DashboardAdmin />
            </ProtectedRoute>
          } />
          <Route path='/add-observation' element={
            <ProtectedRoute>
              <AddObservation />
            </ProtectedRoute>
          } />
          <Route path='/trends' element={
            <ProtectedRoute>
              <Trends />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  )
}
