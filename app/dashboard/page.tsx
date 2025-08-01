"use client";

import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  LineChart,
  Line,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { FileIcon, ImageIcon, VideoIcon } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Radial1 } from "../components/Radial1";
import dummy from "@/app/components/dummy/dummydata.json";
import { Bar1 } from "../components/bar-1";
import { NegBar1 } from "../components/nbar1";

// export function Bar1({
//   date,
//   chartData,
//   chartConfigs,
// }: {
//   date: string;
//   chartData: any;
//   chartConfigs: any;
// }) {
//   return (
//     <div className="p-4">
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           {Object.entries(chartConfigs).map(([key, config]: [string, any]) => (
//             <Bar
//               key={key}
//               dataKey={key}
//               fill={config.color}
//               name={config.label}
//             />
//           ))}
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

export default function DashboardPage() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [userName, setUserName] = useState(dummy[0].name || "Amanda"); // Replace with actual user name
  const [transactions, setTransactions] = useState([]);
  const [userData, setUserData] = useState(dummy[0]);

  useEffect(() => {
    console.log(dummy);
    const fetchTransactions = async () => {
      if (user) {
        const userId = user.uid;
        try {
          const response = await fetch("/api/transactions", {
            headers: {
              Authorization: userId,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setTransactions(data);
          } else {
            console.error("Failed to fetch transactions:", response.status);
          }
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      }
    };

    const fetchUserData = async () => {
      if (user) {
        const userId = user.uid;
        try {
          const response = await fetch(`/api/users/${userId}`, {
            headers: {
              Authorization: userId,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
            setUserName(data.name || "Amanda");
          } else {
            console.error("Failed to fetch user data:", response.status);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchTransactions();
    fetchUserData();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push("/login");
    } catch (error: any) {
      console.error("Sign out error:", error);
      alert("Error signing out: " + error.message);
    }
  };

  const data = [
    {
      subject: "Food",
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: "Travel",
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "Goal",
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "Spending",
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: "Inverstment",
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: "Savings",
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];
  const getMonthlyProfitData = () => {
    return userData.monthly_summary.map((monthData) => {
      const date = new Date(monthData.month + "-01");
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      return {
        month: `${month} ${year}`,
        visitors: monthData.total_income - monthData.total_expenses,
      };
    });
  };

  const monthlyProfitData = getMonthlyProfitData();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Hi, {userName}!</h1>
        <p className="text-gray-500">
          Let's take a look at your activity today
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-sm text-gray-500 font-medium">Total Balance</h3>
          <p className="text-2xl font-semibold mt-2">
            ₹ {userData.current_account_balances["Main Checking"]}
          </p>
          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded mt-2">
            +
            {userData.monthly_summary[userData.monthly_summary.length - 1]
              .savings_rate * 10}
            {"% "}
            vs last month
          </span>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm text-gray-500 font-medium">Total Profit</h3>
          <p className="text-2xl font-semibold mt-2">
            ₹{" "}
            {userData.monthly_summary[userData.monthly_summary.length - 1][
              "total_income"
            ] -
              userData.monthly_summary[userData.monthly_summary.length - 1][
                "total_expenses"
              ]}
          </p>
          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded mt-2">
            +8.2% vs last month
          </span>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm text-gray-500 font-medium">Total Spend </h3>
          <p className="text-2xl font-semibold mt-2">
            ₹{" "}
            {
              userData.monthly_summary[userData.monthly_summary.length - 1]
                .total_expenses
            }
          </p>
          <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded mt-2">
            -2.1% vs last month
          </span>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Bar1
          Name="Expenses Chart"
          date={
            userData.monthly_summary[userData.monthly_summary.length - 1].month
          }
          chartData={
            userData.monthly_summary[userData.monthly_summary.length - 1]
              .expense_categories
          }
          chartConfig={{
            value: {
              label: "Value",
            },
          }}
        />

        <Radial1
          Name="Goal Progress"
          data={[userData.financial_goals_summary["Down Payment for Car"]]}
          date={
            userData.monthly_summary[userData.monthly_summary.length - 1].month
          }
          chartConfig={{
            target_amount: {
              label: "Target Amount",
              color: "var(--color-desktop)",
            },
            current_saved: {
              label: "Current Saved",
              color: "var(--color-mobile)",
            },
          }}
        />

        <NegBar1 data={monthlyProfitData} />
      </div>
    </div>
  );
}
