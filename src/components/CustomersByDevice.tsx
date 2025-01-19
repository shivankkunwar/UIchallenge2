import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchCustomerData } from "../services/api";
import { CustomerDevice } from "../types";

export default function CustomersByDevice() {
  const [data, setData] = useState<CustomerDevice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchCustomerData();
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch customer data:", error);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 space-y-4">
        <div className="animate-pulse h-6 w-48 bg-gray-200 rounded"></div>
        <div className="animate-pulse h-64 bg-gray-100 rounded"></div>
        <div className="animate-pulse flex justify-between mt-4">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
          {payload.map((pld: any, index: number) => (
            <div key={index} className="text-sm text-gray-600">
              {pld.name}: {pld.value.toLocaleString()}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-base font-medium text-gray-900 mb-6">
        Customers by device
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="webSalesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="unique_count"
              stroke="#93C5FD"
              strokeWidth={2}
              dot={false}
              name="Offline selling"
            />
            <Line
              type="monotone"
              dataKey="cumulative_tweets"
              stroke="#2563EB"
              strokeWidth={2}
              dot={false}
              name="Web sales"
              fill="url(#webSalesGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 flex  flex-col md:flex-row justify-around items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2 justify-content items-center">
            <span className="text-sm text-gray-500">Web sales</span>
            <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
          </div>

          <span className="text-sm font-medium text-gray-900">1,304%</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2 justify-content items-center">
          <span className="text-sm text-gray-500">Offline selling</span>
            <div className="w-3 h-3 bg-blue-300 rounded-sm"></div>
            
          </div>

          <span className="text-sm font-medium text-gray-900">473%</span>
        </div>
      </div>
    </div>
  );
}
