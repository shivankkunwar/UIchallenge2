import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { MonthlyComparison, CustomLegendProps} from '../types'

export default function ComparisonChart() {
  const [data, setData] = useState<MonthlyComparison[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/monthly-comparison')
        const data = await response.json()
        setData(data)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch comparison data:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const CustomLegend = ({ payload }:CustomLegendProps) => {
    if (!payload) return null;
    
    return (
      <div className="flex justify-center items-center gap-6 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col animate-pulse" aria-busy="true">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="flex-1 bg-gray-200 rounded"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mt-4 mx-auto"></div>
      </div>
    )
  }
  return (
    <div className="bg-white p-6 rounded-lg">
    
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          barGap={0}
        >
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280' }}
            width={45}
            tickFormatter={(value) => `${value/1000}k`}
          />
          <Tooltip 
            cursor={false}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              padding: '8px'
            }}
          />
          <Legend 
            content={<CustomLegend />}
            verticalAlign="bottom"
            align="center"
          />
          <Bar 
            dataKey="last_year" 
            fill="#93C5FD" 
            radius={[4, 4, 0, 0]}
            name="Last year"
          />
          <Bar 
            dataKey="this_year" 
            fill="#2563EB" 
            radius={[4, 4, 0, 0]}
            name="This year"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
  )
}