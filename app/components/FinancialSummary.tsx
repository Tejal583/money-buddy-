"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

interface FinancialSummaryProps {
  transactions: any[];
}

const FinancialSummary = ({ transactions }: FinancialSummaryProps) => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const transactionsQuery = query(
      collection(db, "transactions"),
      where("timestamp", ">=", Timestamp.fromDate(startOfDay)),
      where("timestamp", "<", Timestamp.fromDate(endOfDay))
    );

    const unsubscribe = onSnapshot(transactionsQuery, (snapshot) => {
      let totalIncome = 0;
      let totalExpenses = 0;

      snapshot.forEach((doc) => {
        const transaction = doc.data();
        if (transaction.type === "income") {
          totalIncome += transaction.amount;
        } else if (transaction.type === "expense") {
          totalExpenses += transaction.amount;
        }
      });

      setIncome(totalIncome);
      setExpenses(totalExpenses);
      setSavings(totalIncome - totalExpenses);
    });

    return () => unsubscribe();
  }, []);

  const data = [
    { name: "Income", value: income },
    { name: "Expenses", value: expenses },
    { name: "Savings", value: savings },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Financial Summary</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-between mb-2">
        <span>Income:</span>
        <span className="text-green-500">${income}</span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span>Expenses:</span>
        <span className="text-red-500">${expenses}</span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span>Savings:</span>
        <span className="text-blue-500">${savings}</span>
      </div>
    </div>
  );
};

export default FinancialSummary;
