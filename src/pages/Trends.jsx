import { useEffect, useState } from 'react';
import API from '../api/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

export default function Trends(){
  const [data, setData] = useState([]);
  useEffect(()=>{
    API.get('/api/observations/trends').then(r=>{
      const rows = r.data.trends || [];
      const grouped = {};
      rows.forEach(row => {
        const d = new Date(row.day).toLocaleDateString();
        grouped[d] = grouped[d] || { day: d };
        grouped[d][row.metric_name] = Number(row.avg_val);
      });
      setData(Object.values(grouped));
    }).catch(()=>{});
  },[]);

  return (
    <div className='max-w-3xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Trends</h1>
      <div className='bg-white p-4 rounded shadow' style={{height:300}}>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={data}><CartesianGrid strokeDasharray='3 3' /><XAxis dataKey='day' /><YAxis /><Tooltip /><Legend />
            {data[0] && Object.keys(data[0]).filter(k=>k!=='day').map((key,i)=>(<Line key={key} type='monotone' dataKey={key} stroke={'#'+Math.floor(Math.random()*16777215).toString(16)} />))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
