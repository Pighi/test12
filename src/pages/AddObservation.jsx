import { useState } from 'react';
import API from '../api/api';
export default function AddObservation(){
  const [form, setForm] = useState({ plant_name:'', species:'', location:'', notes:'' });
  const [files, setFiles] = useState([]);
  const submit = async (e) =>{
    e.preventDefault();
    const fd = new FormData();
    fd.append('plant_name', form.plant_name);
    fd.append('species', form.species);
    fd.append('location', form.location);
    fd.append('notes', form.notes);
    fd.append('measurements', JSON.stringify([{ metric_name:'height_cm', metric_value: 0 }]));
    for (const f of files) fd.append('photos', f);
    try{
      await API.post('/api/observations', fd);
      alert('Saved');
    }catch(err){ alert(err?.response?.data?.error || err.message); }
  };
  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Add Observation</h1>
      <form onSubmit={submit} className='bg-white p-4 rounded shadow'>
        <input required placeholder='Plant name' value={form.plant_name} onChange={e=>setForm({...form,plant_name:e.target.value})} className='w-full p-2 mb-2 border rounded' />
        <input placeholder='Species' value={form.species} onChange={e=>setForm({...form,species:e.target.value})} className='w-full p-2 mb-2 border rounded' />
        <input placeholder='Location' value={form.location} onChange={e=>setForm({...form,location:e.target.value})} className='w-full p-2 mb-2 border rounded' />
        <textarea placeholder='Notes' value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} className='w-full p-2 mb-2 border rounded' />
        <label className='block mb-2'>Photos</label>
        <input type='file' multiple accept='image/*' onChange={e=>setFiles([...e.target.files])} className='mb-4' />
        <button className='px-4 py-2 bg-blue-600 text-white rounded'>Save</button>
      </form>
    </div>
  )
}
