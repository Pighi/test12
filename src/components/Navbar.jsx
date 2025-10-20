import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
export default function Navbar(){
  const { user, setUser } = useAuth();
  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem('pods_token');
    localStorage.removeItem('pods_user');
    setUser(null);
    nav('/login');
  };
  return (
    <nav className='bg-white shadow'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <Link to='/' className='font-bold text-lg'>PODS</Link>
        <div className='space-x-3'>
          {user ? (
            <>
              <Link to='/dashboard' className='px-3 py-1 rounded bg-green-100'>Dashboard</Link>
              <Link to='/add-observation' className='px-3 py-1 rounded bg-blue-100'>Add</Link>
              <Link to='/trends' className='px-3 py-1 rounded bg-yellow-100'>Trends</Link>
              {user.role === 'admin' && <Link to='/admin' className='px-3 py-1 rounded bg-purple-100'>Admin</Link>}
              <button onClick={logout} className='px-3 py-1 rounded bg-red-100'>Logout</button>
            </>
          ) : (
            <>
              <Link to='/login' className='px-3 py-1 rounded bg-blue-500 text-white'>Login</Link>
              <Link to='/signup' className='px-3 py-1 rounded bg-green-500 text-white'>Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
