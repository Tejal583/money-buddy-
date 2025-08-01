import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface UserProfile {
  name: string;
  email: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = req.headers.get("Authorization");
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();

    // Fetch additional user data (accounts, income, expenses, goals)
    const accountsQuery = query(
      collection(db, "accounts"),
      where("userId", "==", userId)
    );
    const accountsSnapshot = await getDocs(accountsQuery);
    const accounts = accountsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const incomeQuery = query(
      collection(db, "income"),
      where("userId", "==", userId)
    );
    const incomeSnapshot = await getDocs(incomeQuery);
    const income = incomeSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const expensesQuery = query(
      collection(db, "expenses"),
      where("userId", "==", userId)
    );
    const expensesSnapshot = await getDocs(expensesQuery);
    const expenses = expensesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const financialGoalsQuery = query(
      collection(db, "financial_goals"),
      where("userId", "==", userId)
    );
    const financialGoalsSnapshot = await getDocs(financialGoalsQuery);
    const financialGoals = financialGoalsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const responseData = {
      ...userData,
      accounts: accounts,
      income: income,
      expenses: expenses,
      financial_goals: financialGoals,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    console.error("Error getting user profile:", error);
    return NextResponse.json(
      { message: "Failed to get user profile" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = req.headers.get("Authorization");
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userDocRef = doc(db, "users", userId);

    const requestBody: UserProfile = await req.json();
    const { name, email } = requestBody;

    await updateDoc(userDocRef, {
      name: name,
      email: email,
      updatedAt: new Date(),
    });

    return NextResponse.json({ message: "User profile updated" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { message: "Failed to update user profile" },
      { status: 500 }
    );
  }
}
