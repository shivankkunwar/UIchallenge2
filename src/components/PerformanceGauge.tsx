import { useEffect, useState } from 'react'

import { PerformanceScore } from '../types'
import { fetchPerformance } from '../services/api'

export default function ComparisonChart() {
  const [data, setData] = useState<PerformanceScore| null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPerformance()
  
        setData(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch comparison data:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading chart...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Failed to load chart data</div>
      </div>
    )
  }


  const radius = 40;
  const circumference = radius * Math.PI;
  const offset = circumference - (data.score / 100) * circumference;

  return (
    <div className="h-full flex flex-col justify-between">
    <div className="relative w-full max-w-[200px] mx-auto">
      <svg className="w-full h-auto" viewBox="0 0 100 50">
        <path
          d="M10,50 A40,40 0 1,1 90,50"
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M10,50 A40,40 0 1,1 90,50"
          fill="none"
          stroke="#2563EB"
          strokeWidth="10"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <span className="text-3xl md:text-4xl font-medium text-gray-900">{data.score}</span>
        <div className="text-sm text-gray-400 mt-1">of 100 points</div>
      </div>
    </div>

    <div className="mt-2 mx-auto text-left">
      <h2 className="text-xl font-medium text-gray-900 mb-2">{data.title}</h2>
      <p className="text-gray-500 text-sm mb-4">
        {data.message}
      </p>
      <button
        className="px-4 py-2 text-sm text-gray-600 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors font-medium"
        onClick={() => console.log('Improve score clicked')}
      >
        Improve your score
      </button>
    </div>
  </div>
  
  );
}