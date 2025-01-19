import { useEffect, useState } from 'react'
import { TopProduct } from '../types'
import { StarIcon } from '@heroicons/react/24/solid'

export default function TopProducts() {
  const [products, setProducts] = useState<TopProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/top-products')
        const data = await response.json()
        console.log(data)
        setProducts(data)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 space-y-4">
        <div className="animate-pulse h-6 w-32 bg-gray-200 rounded"></div>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse flex space-x-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-medium text-gray-900">Top Products</h3>
        <button className="text-sm text-gray-500 hover:text-gray-700">
          Full results
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        {/* Mobile View */}
        <div className="block sm:hidden">
          <div className="space-y-2">
            {products.map((product) => (
              <div key={product.id} className="p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img
                    className="h-10 w-10 rounded-lg object-cover"
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.product_name}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.product_name}
                    </p>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ${product.revenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sold
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-lg object-cover"
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.product_name}
                      />
                      <span className="ml-2 text-sm text-gray-900">
                        {product.product_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {product.sold_amount}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    ${product.unit_price}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    ${product.revenue.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1">{product.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}