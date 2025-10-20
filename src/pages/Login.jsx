import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
export default function Login(){
  const [form, setForm] = useState({ email: '', password: '' });
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const r = await API.post('/api/auth/login', form);
      if (r.data.token) localStorage.setItem('pods_token', r.data.token);
      if (r.data.user) localStorage.setItem('pods_user', JSON.stringify(r.data.user));
      nav('/dashboard');
    } catch (err) { alert(err?.response?.data?.error || err.message); }
  };
  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded shadow'>
      <h2 className='text-xl font-bold mb-4'>Login</h2>
      <form onSubmit={submit}>
        <input type='email' required placeholder='Email' value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className='w-full p-2 mb-2 border rounded' />
        <input type='password' required placeholder='Password' value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className='w-full p-2 mb-4 border rounded' />
        <button className='w-full p-2 bg-blue-600 text-white rounded'>Login</button>
      </form>
    </div>
  )
}
