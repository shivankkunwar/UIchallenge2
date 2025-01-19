import { useEffect, useState } from 'react'
import { fetchMetrics } from '../services/api'

import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'
import { KPIMetric } from '../types'

export default function KPIMetrics() {
  const [metrics, setMetrics] = useState<KPIMetric|null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const response = await fetchMetrics()
        setMetrics(response.data)
      } catch (err) {
        setError('Failed to load metrics')
        console.error('Failed to fetch metrics:', err)
      } finally {
        setLoading(false)
      }
    }

    loadMetrics()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-4 shadow animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-800">{error}</p>
      </div>
    )
  }

  if (!metrics) return null
  const metricsData = [
    {
      label: 'Purchases',
      value: metrics.purchases.toLocaleString(),
      change: 32,
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      label: 'Revenue',
      value: `$${(metrics.revenue / 1000).toFixed(1)}k`,
      change: 49,
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      label: 'Refunds',
      value: `$${(metrics.refunds / 1000).toFixed(1)}k`,
      change: -7,
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {metricsData.map((metric, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-4 border border-gray-100"
        >
          <h3 className="text-sm text-gray-500 font-medium">
            {metric.label}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-2xl font-semibold text-gray-900">
              {metric.value}
            </p>
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-sm ${
                metric.bgColor
              } ${metric.textColor}`}
            >
              {metric.change > 0 ? (
                <ArrowUpIcon className="h-4 w-4" />
              ) : (
                <ArrowDownIcon className="h-4 w-4" />
              )}
              {Math.abs(metric.change)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}