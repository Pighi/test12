import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
export default function Signup(){
  const [form, setForm] = useState({ name:'', email: '', password: '' });
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/auth/signup', form);
      alert('Account created. Please login.');
      nav('/login');
    } catch (err) { alert(err?.response?.data?.error || err.message); }
  };
  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded shadow'>
      <h2 className='text-xl font-bold mb-4'>Signup</h2>
      <form onSubmit={submit}>
        <input required placeholder='Full name' value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className='w-full p-2 mb-2 border rounded' />
        <input type='email' required placeholder='Email' value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className='w-full p-2 mb-2 border rounded' />
        <input type='password' required placeholder='Password' value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className='w-full p-2 mb-4 border rounded' />
        <button className='w-full p-2 bg-green-600 text-white rounded'>Signup</button>
      </form>
    </div>
  )
}
