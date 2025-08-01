"use client";

import { useState, useEffect } from "react";
import { Card } from "@/app/components/ui/card";

interface UserDataProps {
  userData: any; // Replace with a more specific type
}

const UserData: React.FC<UserDataProps> = ({ userData }) => {
  return (
    <div>
      <h2>{userData.name}</h2>
      <h3>Accounts</h3>
      <ul>
        {userData.accounts.map((account: any) => (
          <li key={account.account_number}>
            {account.account_type}: {account.account_name} - {account.balance}{" "}
            {account.currency}
          </li>
        ))}
      </ul>

      <h3>Income</h3>
      <ul>
        {userData.income.map((income: any) => (
          <li key={income.income_source}>
            {income.income_source}: {income.amount} ({income.frequency})
          </li>
        ))}
      </ul>

      <h3>Expenses</h3>
      <ul>
        {userData.expenses.map((expense: any) => (
          <li key={expense.description}>
            {expense.expense_category}: {expense.description} - {expense.amount}
          </li>
        ))}
      </ul>

      <h3>Financial Goals</h3>
      <ul>
        {userData.financial_goals.map((goal: any) => (
          <li key={goal.goal_name}>
            {goal.goal_name}: {goal.current_savings_towards_goal} /{" "}
            {goal.target_amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserData;
