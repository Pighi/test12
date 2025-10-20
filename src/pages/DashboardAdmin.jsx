import { useEffect, useState } from 'react';
import API from '../api/api';
export default function DashboardAdmin(){
  const [students, setStudents] = useState([]);
  useEffect(()=>{
    API.get('/api/admin/students').then(r=>setStudents(r.data.students)).catch(()=>{});
  },[]);
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
      <div className='grid gap-2'>
        {students.map(s => <div key={s.id} className='p-3 bg-white rounded shadow'>{s.name} — {s.email}</div>)}
      </div>
    </div>
  )
}
