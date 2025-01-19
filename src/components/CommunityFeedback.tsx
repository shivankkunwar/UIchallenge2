import { useEffect, useState } from 'react'
import { fetchFeedback } from '../services/api'
import type { CommunityFeedback } from '../types/index'

export default function CommunityFeedback() {
  const [feedback, setFeedback] = useState<CommunityFeedback | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const response = await fetchFeedback()
        setFeedback(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch feedback:', error)
        setLoading(false)
      }
    }
    loadFeedback()
  }, [])

  if (loading) return <div>Loading feedback...</div>

  if (!feedback) return null

  const total = feedback.negative + feedback.neutral + feedback.positive
  const positiveWidth = (feedback.positive / total) * 100
  const neutralWidth = (feedback.neutral / total) * 100
  const negativeWidth = (feedback.negative / total) * 100

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Community feedback</h3>
      <h4 className="text-xl font-semibold mb-4">Mostly positive</h4>
      
      <div className="h-2 flex rounded-full overflow-hidden">
        <div 
          className="bg-red-400"
          style={{ width: `${negativeWidth}%` }}
        />
        <div 
          className="bg-yellow-400"
          style={{ width: `${neutralWidth}%` }}
        />
        <div 
          className="bg-green-400"
          style={{ width: `${positiveWidth}%` }}
        />
      </div>

      <div className="mt-4 flex justify-between text-sm">
        <div>
          <span className="text-gray-500">Negative</span>
          <span className="ml-2 font-medium">{feedback.negative}</span>
        </div>
        <div>
          <span className="text-gray-500">Neutral</span>
          <span className="ml-2 font-medium">{feedback.neutral}</span>
        </div>
        <div>
          <span className="text-gray-500">Positive</span>
          <span className="ml-2 font-medium">{feedback.positive}</span>
        </div>
      </div>
    </div>
  )
}