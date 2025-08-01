"use client";

import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const mockData = {
  monthlySpending: [
    { month: "Jan", amount: 2100 },
    { month: "Feb", amount: 1800 },
    { month: "Mar", amount: 2400 },
    { month: "Apr", amount: 1900 },
    { month: "May", amount: 2800 },
    { month: "Jun", amount: 2300 },
  ],
  categories: [
    { name: "Housing", value: 35 },
    { name: "Food", value: 20 },
    { name: "Transport", value: 15 },
    { name: "Entertainment", value: 10 },
    { name: "Shopping", value: 12 },
    { name: "Others", value: 8 },
  ],
  trends: [
    { date: "Week 1", income: 3200, expenses: 2700 },
    { date: "Week 2", income: 3400, expenses: 2900 },
    { date: "Week 3", income: 3100, expenses: 2600 },
    { date: "Week 4", income: 3600, expenses: 3100 },
  ],
};

const COLORS = [
  "#4F46E5",
  "#EC4899",
  "#14B8A6",
  "#F59E0B",
  "#6366F1",
  "#8B5CF6",
];

export default function InsightsPage() {
  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Financial Insights</h1>
        <p className="text-gray-600">
          Track your spending patterns and financial trends
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-sm text-gray-500 font-medium">Total Spending</h3>
          <p className="text-2xl font-semibold mt-2">$12,450</p>
          <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded mt-2">
            +15.3% vs last month
          </span>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm text-gray-500 font-medium">Total Income</h3>
          <p className="text-2xl font-semibold mt-2">$16,800</p>
          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded mt-2">
            +8.2% vs last month
          </span>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm text-gray-500 font-medium">Savings Rate</h3>
          <p className="text-2xl font-semibold mt-2">25.9%</p>
          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded mt-2">
            +2.1% vs last month
          </span>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Spending */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Monthly Spending</h2>
            <Button variant="outline" size="sm">
              Last 6 months
            </Button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.monthlySpending}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Income vs Expenses */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Income vs Expenses</h2>
            <Button variant="outline" size="sm">
              Last 4 weeks
            </Button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.trends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#4F46E5"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#EC4899"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Spending by Category</h2>
          <Button variant="outline" size="sm">
            This Month
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockData.categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockData.categories.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid content-center">
            <div className="space-y-4">
              {mockData.categories.map((category, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-4 h-4 rounded mr-3"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-gray-500">{category.value}%</span>
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-1 rounded-full"
                        style={{
                          width: `${category.value}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
