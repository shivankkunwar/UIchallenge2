import { useEffect, useState } from "react";
import {
  fetchMetrics,
  fetchCustomerData,
  fetchFeedback,
  fetchPerformance,
} from "../services/api";
import KPIMetrics from "../components/KPIMetrics";
import ComparisonChart from "../components/ComparisonChart";
import PerformanceGauge from "../components/PerformanceGauge";
import CustomersByDevice from "../components/CustomersByDevice";
import CommunityFeedback from "../components/CommunityFeedback";
import TopProducts from "../components/TopProducts";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          fetchMetrics(),
          fetchCustomerData(),
          fetchFeedback(),
          fetchPerformance(),
        ]);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch dashboard data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="grid grid-cols-12 gap-2">
        {/* Main content area - 8 columns */}
        <div className="bg-white rounded-lg col-span-8 space-y-6 p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Compare to</span>
              <select className="text-sm border border-gray-200 rounded-md px-2 py-1">
                <option>Last year</option>
                <option>Last month</option>
              </select>
            </div>
          </div>
          <KPIMetrics />

          <div className=" shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Comparison</h2>
              <select className="text-sm border border-gray-200 rounded-md px-2 py-1">
                <option>6 months</option>
                <option>12 months</option>
              </select>
            </div>
            <ComparisonChart />
          </div>

          <div className=" shadow-sm">
            <TopProducts />
          </div>
        </div>

        {/* Sidebar area - 4 columns */}
        <div className="col-span-4 space-y-6">
          <PerformanceGauge />
          <CustomersByDevice />
          <CommunityFeedback />
        </div>
      </div>
    </div>
  );
}
