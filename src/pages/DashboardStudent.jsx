import { useEffect, useState } from 'react';
import API from '../api/api';
export default function DashboardStudent(){
  const [observations, setObservations] = useState([]);
  useEffect(()=>{
    API.get('/api/observations/my').then(r=>setObservations(r.data.observations)).catch(()=>{});
  },[]);
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Your Observations</h1>
      <div className='grid gap-4'>
        {observations.length===0 && <div className='p-4 bg-white rounded'>No observations yet. Add one!</div>}
        {observations.map(o=> (
          <div key={o.id} className='p-4 bg-white rounded shadow'>
            <div className='flex justify-between'><strong>{o.plant_name || 'Unnamed'}</strong><span>{new Date(o.observed_at).toLocaleString()}</span></div>
            <div className='text-sm text-gray-600'>{o.notes}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
