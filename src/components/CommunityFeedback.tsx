import { useEffect, useState } from 'react'
import { fetchFeedback } from '../services/api'
import type { CommunityFeedback } from '../types'

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

  if (loading) return (
    <div className="h-full flex items-center justify-center">
      <div className="text-gray-500">Loading feedback...</div>
    </div>
  )

  if (!feedback) return null

  const total = feedback.negative + feedback.neutral + feedback.positive
  const positiveWidth = (feedback.positive / total) * 100
  const neutralWidth = (feedback.neutral / total) * 100
  const negativeWidth = (feedback.negative / total) * 100

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-base font-medium text-gray-900 mb-4">Community feedback</h3>
      <h4 className="text-lg font-semibold mb-4">Mostly positive</h4>
      
      <div className="h-2 flex rounded-full overflow-hidden mb-4">
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

      <div className="flex justify-between text-xs">
        <div>
          <span className="text-gray-500">Negative</span>
          <span className="ml-1 font-medium">{feedback.negative}</span>
        </div>
        <div>
          <span className="text-gray-500">Neutral</span>
          <span className="ml-1 font-medium">{feedback.neutral}</span>
        </div>
        <div>
          <span className="text-gray-500">Positive</span>
          <span className="ml-1 font-medium">{feedback.positive}</span>
        </div>
      </div>
    </div>
  )
}

